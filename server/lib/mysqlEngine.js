const mysql = require("mysql");
const { join } = require('path')

try {
  const dotenvPath = join(__dirname, '..', '..', '.env');
  console.log('Constructed .env path:', dotenvPath);
  require('dotenv').config({ path: dotenvPath });
} catch (error) {
  console.error('Error loading .env file:', error);
}

// Create a MySQL connection
const mySqlEngine = new function () {
  this.mysqlPool = "";
  this.createConnection = (cb) => {
    if (!this.mysqlPool) {
      this.mysqlPool = mysql.createPool({
        connectionLimit: process.env.MYSQL_CONN_LIMIT,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        multipleStatements: true,
        dateStrings: "date",
      });

      this.mysqlPool.getConnection((err, connection) => {
        if (err) {
          console.error('Error connecting to MySQL:', err);
          return cb(err);
        }
        connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
          connection.release();
          if (error) {
            console.error('Error executing test query:', error);
            return cb(error);
          }
          console.log('Successfully connected to MySQL. Result:', results[0].solution);
          cb(null, results[0].solution);

          this.mysqlPool.on('connection', (connection) => {
            console.info(process.env['MYSQL_CONNECTION'], connection.threadId);
          });

          this.mysqlPool.on('error', (err) => {
            console.error(process.env['MYSQL_CONNECTION_ALERT'], process.env['email'], err);
          });
        });
      });
    } else {
      console.log('MySQL pool already initialized.');
      cb(null);
    }
  };


  this.executeQuery = (query) => {
    return new Promise((resolve, reject) => {
      this.mysqlPool.query(query, (err, rows, fields) => {
        if (err) {
          console.error("@@Error::@@Sql error: ", JSON.stringify(err));
          reject(err);
        } else {
          console.log("query:", query);
          resolve(rows);
        }
      });
    });
  };

  this.closeConnection = () => {
    if (this.mysqlPool) {
      this.mysqlPool.end(function (err) {
        console.log("end.................", "mysqlPool");
      });
    }
  };

  this.mysqlFormat = (query, value) => {
    return mysql.format(query, value);
  };
};

module.exports = mySqlEngine;

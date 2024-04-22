const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");


const mysql = require('./server/lib/mysqlEngine');
const parentRoutes = require('./server/routes/parentRoutes');

const app = express();
let PORT = process.env.SERVER_PORT || 8090


app.set('trust proxy', true);
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  })
);


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});

app.use(
    session({
      secret: "secret",
      saveUninitialized: false,
      resave: false
    })
  );

  const result = async () => {
    await mysql.createConnection().catch((e) => {
      console.error(e.message);
      process.exit(1);
    });
  };
  mysql.createConnection((error, data) => {
    if (error) {
      console.error(error.message);
      process.exit(1);
    } 
  });


app.use(parentRoutes);


// Catch-all middleware for non-existent endpoints
app.use((req, res, next) => {
  res.status(404).send('End Point Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


// Start the server
app.listen(PORT, function () {
    console.log("CONVERGE AI is running at http://localhost:" + PORT);
});
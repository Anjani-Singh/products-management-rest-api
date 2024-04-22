const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

const { combine, timestamp, json, printf } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

exports.httpLogger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        timestamp,
        message,
        data,
      };

      return JSON.stringify(response);
    })
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
        filename: 'logs/rotating-logs-%DATE%.log', 
        datePattern: 'MMMM-DD-YYYY',
        zippedArchive: false, 
        maxSize: '20m', 
        maxFiles: '14d'
    })
]
});
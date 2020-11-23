// const winston = require('winston');
// const expressWinston = require('express-winston');
const newrelicFormatter = require("@newrelic/winston-enricher");

// const options = {
//   // file for /etc/newrelic-infra/logging.d/nodejs.yml
//   file: {
//     filename: 'logs/app.log',
//     format: winston.format.combine(newrelicFormatter(), winston.format.label({ label: 'test' })),
//     handleExceptions: true,
//     json: true,
//     level: 'info',
//     maxFiles: 5,
//     maxsize: 5 * 1024 * 1024, // 5 MB
//   },
//   console: {
//     colorize: false,
//     format: winston.format.combine(winston.format.prettyPrint(), winston.format.simple()),
//     handleExceptions: true,
//     level: 'debug', // lowest priority - i.e. console.log everything
//   },
// };
// const logger = winston.createLogger({
//   transports: [new winston.transports.File(options.file), new winston.transports.Console(options.console)],
//   dynamicMeta: function (req, res) {
//     return {
//       user: req.user ? req.user.username : null,
//       role: req.user ? req.user.roles : null,
//     };
//   },
//   exitOnError: false, // do not exit on handled exceptions
// });

// const loggerMiddleware = expressWinston.logger({
//   winstonInstance: logger,
//   colorize: false,
// });

// const error = expressWinston.errorLogger({
//   winstonInstance: logger,
// });

// const errorLoggerMiddleware = expressWinston.errorLogger({
//   dumpExceptions: true,
//   showStack: true,
//   transports: [
//     new winston.transports.Console({
//       colorize: false,
//       handleExceptions: true,
//     }),
//   ],
//   format: winston.format.combine(winston.format.prettyPrint(), winston.format.simple()),
// });

// module.exports = { logger, loggerMiddleware, error, errorLoggerMiddleware };

const { createLogger, format, transports } = require("winston");

// set default log level.
const logLevel = "info";

const logger = createLogger({
  level: logLevel,
  levels: {
    fatal: 0,
    crit: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  },
  handleExceptions: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  format: format.combine(newrelicFormatter(), format.label({ label: "test" })),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "app.log",
    }),
  ],
});

logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

/* LOGGER EXAMPLES
  const log = require('./log.js')
  log.trace('testing')
  log.debug('testing')
  log.info('testing')
  log.warn('testing')
  log.crit('testing')
  log.fatal('testing')
 */

module.exports = logger;

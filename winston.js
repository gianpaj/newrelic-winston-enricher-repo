const { createLogger, format, transports } = require("winston");
const newrelicFormatter = require("@newrelic/winston-enricher");

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

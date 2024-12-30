const { createLogger, format, transports } = require('winston');

const to_file = process.env.TO_FILE || false;
const log_format = format.combine(
    format.colorize({ all: true }), // Add colors
    format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
    format.align(),
    format.printf(info => `[${info.level}] : ${[info.timestamp]} : ${info.message}`),
);

let main_transport = new transports.Console({ format: log_format });

if (to_file) {
    main_transport = new transports.File({
        filename: 'logs/server.log',
        format: log_format
    });
}

const logger = createLogger({
    transports: [main_transport]
});

module.exports = logger;

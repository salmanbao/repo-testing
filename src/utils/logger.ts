import { createLogger, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const transport = new DailyRotateFile({
    filename: `drop_fee_script-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    dirname: 'logs',
});

const logger = createLogger({
    transports: [transport],
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, service }) => {
            return `[${timestamp}] ${level}: ${message}`;
        }),
    ),
});

export default logger;

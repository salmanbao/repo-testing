"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const transport = new winston_daily_rotate_file_1.default({
    filename: `drop_fee_script-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    dirname: "logs"
});
const logger = (0, winston_1.createLogger)({
    transports: [transport],
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(({ timestamp, level, message, service }) => {
        return `[${timestamp}] ${level}: ${message}`;
    }))
});
exports.default = logger;
//# sourceMappingURL=logger.js.map
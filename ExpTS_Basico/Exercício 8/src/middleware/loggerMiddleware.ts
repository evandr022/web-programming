import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const logDir = process.env.LOG_DIR || './logs';
const logFormat = process.env.LOG_FORMAT || 'simple';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const logEntry = createLogEntry(req, logFormat);
    const logFilePath = path.join(logDir, 'access.log');

    fs.appendFile(logFilePath, logEntry + '\n', (err) => {
        if (err) {
            console.error('Failed to write log entry:', err);
        }
    });

    next();
};

const createLogEntry = (req: Request, format: string): string => {
    const timestamp = new Date().toISOString();
    const url = req.url;
    const method = req.method;
    const httpVersion = req.httpVersion;
    const userAgent = req.get('User-Agent') || '';

    if (format === 'complete') {
        return `${timestamp} - ${method} ${url} HTTP/${httpVersion} - ${userAgent}`;
    } else {
        return `${timestamp} - ${method} ${url}`;
    }
};

export default loggerMiddleware;

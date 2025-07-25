import { Request, Response, NextFunction } from 'express';

export function loggingHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    logging.log(
        `Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on('finish', () => {
        logging.log(
            `Responded - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
        );
    });

    next(); // Continue on to the next piece of middleware or route handler
}

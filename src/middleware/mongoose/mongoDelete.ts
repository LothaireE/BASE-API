import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { TEST } from '../../config/config';

export function MongoDelete(model: Model<any>) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const document = await model.findOneAndDelete({
                _id: req.params.id
            });
            if (!document)
                return res.status(404).json({
                    error: 'Document not found'
                });
            req.declaredMethod = 'mongoDelete';
        } catch (error) {
            !TEST && logging.error('Error in MongoDelete:', error);
            return res.status(500).json(error);
        }
        next();
    };
}

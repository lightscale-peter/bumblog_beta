import { NextFunction, Request, Response } from 'express';
import JWT, { VerifyErrors } from 'jsonwebtoken';

export const authMiddleware = (req: Request & {decoded?: object | undefined}, res: Response, next: NextFunction) =>{
    const token = req.headers['x-access-token'] || req.query.token;
    const tokenString = typeof(token) === 'string' ? token : '';
    const secret = req.app.get('jwt-secret');

    if(!token){
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    const p = new Promise<object | undefined>((resolve, reject) =>{
        JWT.verify(
            tokenString,
            secret,
            (err: VerifyErrors | null, decoded: object | undefined)  =>{
                if(err) reject(err);
                resolve(decoded);
            }
        )
    });

    const onError = (error: VerifyErrors | null) =>{
        res.status(403).json({
            success: false,
            message: error?.message
        })
    }

    p.then((decoded: object | undefined)=>{
        req.decoded = decoded;
        next();
    }).catch(onError);
}
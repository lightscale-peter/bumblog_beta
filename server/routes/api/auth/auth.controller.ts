import {Request, Response} from 'express';
import User, {userType} from '../../../models/user';

export const createUser = (req: Request, res: Response) =>{
    const respond = (result: boolean) =>{
        res.json(result);
    }
    User.createUser(req.body).then(respond);
};
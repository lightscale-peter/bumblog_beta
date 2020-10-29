import {Request, Response} from 'express';
import User, { userTypeDocument } from '../../../models/user';
import JWT from 'jsonwebtoken';

export const createUser = (req: Request, res: Response) =>{

    const {username, password} = req.body;
 
    const userData = {
        username: username,
        password: password
    }
    
    let newUser: userTypeDocument | null = null;

    const create = (user: userTypeDocument) =>{
        console.log('create', user);
        if(user){
            throw new Error('username is already exist');
        }else{
            return User.createUser(userData);
        }
    }

    const count = (user: userTypeDocument) => {
        newUser = user;
        return User.count({});
    }

    const assign = (count: number) =>{
        if(count === 1 && newUser){
            return newUser.assignAdmin();
        }else{
            return Promise.resolve(undefined);
        }
    }

    const respond = (isAdmin: userTypeDocument | undefined) => {
        res.json({
            message: 'register successfully',
            admin: isAdmin ? true : false
        })
    }

    const onError = (error: Error | null) =>{
        res.status(409).json({
            name: error?.name,
            message: error?.message
        })
    }


    User.findOneByUsername(username)
        .then(create)
        .then(count)
        .then(assign)
        .then(respond)
        .catch(onError);

};

export const findUser = (req: Request, res: Response) =>{

};

export const updateUser = () =>{

};

export const deleteUser = () =>{

};

export const login = (req: Request, res: Response) =>{
    const {username, password} = req.body;
    const secret = req.app.get('jwt-secret');

    const check = (user: userTypeDocument) =>{
        if(user){
            if(user.verify(password)){
                const p = new Promise<string>((resolve, reject) =>{
                    JWT.sign(
                        {
                            _id: user._id,
                            username: user.username,
                            admin: user.admin
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'bumblog.net',
                            subject: 'userInfo'
                        },
                        (err: Error | null, token: string | undefined) =>{
                            if(err) reject(err);
                            resolve(token);
                        }
                    )
                });

                return p;
            }else{
                throw new Error('login fail');
            }
        }else{
            throw new Error('login fail');
        }
    }

    const respond = (token: string | undefined) =>{
        res.json({
            message: 'logged in successfully',
            token
        })
    }

    const onError = (error: Error | null) =>{
        res.status(403).json({
            message: error?.message
        });
    }

    User.findOneByUsername(username)
        .then(check)
        .then(respond)
        .catch(onError);

}
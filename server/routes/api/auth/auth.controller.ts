import {Request, Response} from 'express';
import User, { userTypeDocument } from '../../../models/user';
import JWT, { VerifyErrors } from 'jsonwebtoken';

export const createUser = (req: Request, res: Response) =>{

    const {email, name, password} = req.body;
 
    const userData = {
        email: email,
        name: name,
        password: password
    }
    
    let newUser: userTypeDocument | null = null;

    const create = (user: userTypeDocument) =>{
        console.log('create', user);
        if(user){
            throw new Error('email is already exist');
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
            status: true,
            message: 'register successfully',
            admin: isAdmin ? true : false
        })
    }

    const onError = (error: Error | null) =>{
        res.status(409).json({
            status: false,
            name: error?.name,
            message: error?.message
        })
    }


    User.findOneByEmail(email)
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
    const {email, password} = req.body;
    const secret = req.app.get('jwt-secret');

    const check = (user: userTypeDocument) =>{
        if(user){
            if(user.verify(password)){
                const p = new Promise<string>((resolve, reject) =>{
                    JWT.sign(
                        {
                            _id: user._id,
                            email: user.email,
                            name: user.name,
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

        const exdays = 1;
        res.cookie('token', token, {httpOnly: true, expires: new Date(Date.now() + (exdays*24*60*60*1000))});
        console.log('token registered on cookie');

        res.json({
            status: true,
            message: 'logged in successfully',
            // token
        });        
    }

    const onError = (error: Error | null) =>{
        res.status(403).json({
            status: false,
            message: error?.message
        });
    }

    User.findOneByEmail(email)
        .then(check)
        .then(respond)
        .catch(onError);

}

export const logout = (req: Request, res: Response) =>{
    res.clearCookie('token');
    res.json({
        status: true,
        message: 'logged out successfully'
    });
}

export const check = (req: Request, res: Response) =>{
    const token = req.cookies.token;
    const tokenString = typeof(token) === 'string' ? token : '';
    const secret = req.app.get('jwt-secret');

    if(!token){
        return res.json({
            status: false,
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

    const respond = (decoded: object | undefined) =>{
        res.json({
            status: true,
            info: decoded
        })
    }

    const onError = (error: VerifyErrors | null) =>{
        res.json({
            status: false,
            message: error?.message
        })
    }

    p.then(respond).catch(onError);
}
import {Request, Response} from 'express';
import { Model } from 'mongoose';
import User, {userType, userTypeDocument, modelType} from '../../../models/user';



export const createUser = (req: Request, res: Response) =>{

    const {username, password} = req.body;
 
    const userData = {
        username: username,
        password: password
    }
    
    let newUser: modelType | null = null;

    const create = (user: userType | modelType) =>{
        console.log('create', user);
        if(user){
            throw new Error('username is already exist');
        }else{
            return User.createUser(userData);
        }
    }

    const count = (user: modelType) => {
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

    const respond = (isAdmin: userType | undefined) => {
        res.json({
            message: 'register successfully',
            admin: isAdmin ? true : false
        })
    }

    const onError = (error: {name: string; message: string; stack?: string;}) =>{
        res.status(409).json({
            name: error.name,
            message: error.message
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


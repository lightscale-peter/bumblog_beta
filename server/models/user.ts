import {Schema, Document, Model, model} from 'mongoose';
import CRYPTO from 'crypto';
import {bumblog} from '../config/bumblog.config'


const User = new Schema({
    email: String,
    name: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
});

export type userType = {
    email: string;
    name: string;
    password: string;
    admin?: boolean
}

export interface userTypeDocument extends Document, userType{ // methods
    assignAdmin: () => Promise<userTypeDocument> | undefined;
    verify: (password: string) => boolean;
}

export interface modelType extends Model<userTypeDocument>{ //statics
    findOneByEmail: (email: string) => Promise<userTypeDocument>;
    createUser: (user: userType) => Promise<userTypeDocument>;
}

User.statics.findOneByEmail = function(email: string){
    return this.findOne({email: email});
}

User.statics.createUser = function(userData: userType){

    const encrypted = CRYPTO.createHmac('sha1', bumblog.secret)
                            .update(userData.password)
                            .digest('base64');

    const user = new this({
        ...userData,
        password: encrypted
    });

    return user.save();
}

User.methods.assignAdmin = function(){
    this.admin = true;
    return this.save();
}

User.methods.verify = function(password: string){

    const encrypted = CRYPTO.createHmac('sha1', bumblog.secret)
                            .update(password)
                            .digest('base64');
    return this.password === encrypted;
}

export default model<userTypeDocument, modelType>('User', User, 'user');
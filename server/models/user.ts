import {Schema, Document, Model, model} from 'mongoose';

const User = new Schema({
    username: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
});

export type userType = {
    username: string;
    password: string;
    admin?: {
        type: boolean;
    }
}

export interface userTypeDocument extends Document, userType{}

export interface modelType extends Model<userTypeDocument>{
    findOneByUsername: (username: string) => Promise<userType>;
    createUser: (user: userType) => Promise<userType>;
    assignAdmin: () => Promise<userType> | undefined;
}

User.statics.findOneByUsername = function(username: string){
    return this.findOne({username: username});
}

User.statics.createUser = function(user: userType){
    console.log('user', user);
    return this.create(user);
}

User.methods.assignAdmin = function(){
    this.admin = true;
    return this.save();
}





// User.statics.create = function(username, password){
//     const user = new this({
//         username,
//         password
//     });

//     return user.save();
// }

// User.statics.findOneByUsername = function(username){
//     return this.findOne({
//         username
//     }).exec();
// };

// User.methods.verifiy = function(password){
//     return this.password === password;
// };

// User.methods.assignAdmin = function(){
//     this.admin = true;
//     return this.save();
// }

export default model<userTypeDocument, modelType>('User', User, 'user');
import {Schema, Document, Model, model} from 'mongoose';


const User = new Schema({
    username: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    }
});

export interface userType extends Document{
    username: string;
    password: string;
    admin?: {
        type: boolean;
    }
}
interface modelType extends Model<userType>{
    createUser: (data:userType) => Promise<boolean>;
    // findOneUser: () => void;
    // verifiyPassword: () => void;
    // assignAdmin: () => void;
}

User.statics.createUser = function(data:userType){
    console.log('data', data);

    // return new Promise((resolve, reject) =>{ resolve(true)});
    return model('User').insertMany(data);
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

export default model<userType, modelType>('User', User, 'user');
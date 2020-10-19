import {Request} from 'express'
import mongoose, {Schema, model, Document, Model} from 'mongoose';

const Board = new Schema({
    // _id: String,
    title: String,
    subTitle: String,
    description: String,
    writer: String
});

export interface documentType extends Document{
    _id: string;
    title: string;
    subTitle: string;
    description: string;
    writer: string;
}

interface modelType extends Model<documentType> {
    createList: (data:documentType) => Promise<boolean>
    findAllList: () => Promise<documentType[]>
    findOneList: (req: Request) => Promise<documentType>
    updateList:(data:documentType) => Promise<boolean>
    deleteList: (data:documentType) => Promise<boolean>
}

Board.statics.createList = function(data: documentType){
    console.log('data', data);
    return this.insertMany(data);

};
Board.statics.findAllList = function(){
    return this.find({}).sort({_id: "-1"});
};
Board.statics.findOneList = function(req: Request){
    return model('Board').find({_id: req.query._id});
};

Board.statics.updateList = function(data: documentType){
    return this.updateOne({_id: data._id}, {...data});
};

Board.statics.deleteList = function(data: documentType){
    return this.deleteOne({_id: data._id}, function(err:any){
        console.log('delete Error', err);
    })
}

export default model<documentType, modelType>('Board', Board, 'board');
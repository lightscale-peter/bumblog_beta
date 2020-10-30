import {Schema, model, Document, Model} from 'mongoose';
import { createImportSpecifier } from 'typescript';
import { ContextExclusionPlugin } from 'webpack';

const Board = new Schema({
    // _id: String,
    title: String,
    tags: [String],
    description: String,
    writer: String,
    images: {
        thumbnailImage: [{
            originalname: String,
            filename: String
        }],
        descriptionImage: [{
            originalname: String,
            filename: String
        }]
    }
});

export type boardType = {
    _id?: string;
    title: string;
    tags: string | string[];
    description: string;
    writer: string;
    images: imagesType;
    thumbnailImage?: string;
    descriptionImage?: string;
}

export interface boardTypeDocument extends Document, boardType{ 
    _id: string;
} // methods

export type imagesType = {
        thumbnailImage?: imageNameType[];
        descriptionImage?: imageNameType[];
    }

type imageNameType = {
    originalname: string;
    filename: string;
}

interface modelType extends Model<boardTypeDocument> { // statics
    createList: (boardData: boardType) => Promise<boardTypeDocument>
    findAllList: () => Promise<boardTypeDocument[]>
    findOneListById: (boardId: string) => Promise<boardTypeDocument>
    updateList: (boardData: boardType) => Promise<boardTypeDocument>
    deleteList: (boardId: string) => Promise<boardTypeDocument>
}



Board.statics.createList = function(boardData: boardType){

    const list = new this({
        ...boardData
    });

    return list.save();
};

Board.statics.updateList = function(boardData: boardType){
    return this.updateOne({_id: boardData._id}, boardData);
};

Board.statics.findAllList = function(){
    return this.find({}).sort({_id: "-1"});
};
Board.statics.findOneListById = function(boardId: string){
    return this.findById(boardId);
};
Board.statics.deleteList = function(boardId: string){
    return this.deleteOne({_id: boardId});
}

export default model<boardTypeDocument, modelType>('Board', Board, 'board');
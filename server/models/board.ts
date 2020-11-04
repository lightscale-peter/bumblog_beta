import {Schema, model, Document, Model} from 'mongoose';
import { createImportSpecifier } from 'typescript';
import { ContextExclusionPlugin } from 'webpack';

const Board = new Schema({
    // _id: String,
    title: String,
    tags: [String],
    description: String,
    writer: String,
    thumbnailImage: [{
        originalname: String,
        filename: String
    }],
    descriptionImage: [{
        originalname: String,
        filename: String
    }]
});

export type boardType = {
    _id?: string;
    title: string;
    tags: string | string[];
    description: string;
    writer: string;
    thumbnailImage: imageType[];
    descriptionImage: imageType[];
}

type imageType = {
    originalname: string;
    filename: string;
}

export type imageFileType = {
    thumbnailImageFile?: imageType[];
    descriptionImageFile?: imageType[];
}

export interface boardDocumentType extends Document, boardType{ // methods
    _id: string;
} 


interface modelType extends Model<boardDocumentType> { // statics
    createList: (boardData: boardType) => Promise<boardDocumentType>
    findAllList: () => Promise<boardDocumentType[]>
    findOneListById: (boardId: string) => Promise<boardDocumentType>
    updateList: (boardData: boardType) => Promise<boardDocumentType>
    deleteList: (boardId: string) => Promise<boardDocumentType>
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

export default model<boardDocumentType, modelType>('Board', Board, 'board');
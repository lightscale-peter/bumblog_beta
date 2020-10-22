import {Request} from 'express'
import {Schema, model, Document, Model} from 'mongoose';
import { parseJsonConfigFileContent } from 'typescript';

const Board = new Schema({
    // _id: String,
    title: String,
    tags: [String],
    description: String,
    writer: String,
    images: {
        thumbnail: [{
            originalname: String,
            filename: String
        }],
        description: [{
            originalname: String,
            filename: String
        }]
    }
});

export interface documentType extends Document{
    _id: string;
    title: string;
    tags: string[];
    description: string;
    writer: string;
    images: imagesType;
    thumbnailImage?: string;
    descriptionImage?: string;
}

export type imagesType = {
        thumbnail?: imageNameType[];
        description?: imageNameType[];
    }

type imageNameType = {
    originalname: string;
    filename: string;
}

interface modelType extends Model<documentType> {
    createList: (data:documentType, images: imagesType) => Promise<boolean>
    findAllList: () => Promise<documentType[]>
    findOneList: (req: Request) => Promise<documentType>
    updateList:(data:documentType, images: imagesType) => Promise<boolean>
    deleteList: (data:documentType) => Promise<boolean>
}



Board.statics.createList = function(data: documentType, images: imagesType){

    let thumbImgArray: imageNameType[] = [];
    if(images.thumbnail){
        thumbImgArray = images.thumbnail;
    }

    let descImgArray: imageNameType[] = [];
    if(images.description){
        descImgArray = images.description;
    }

    const total = {
        ...data,
        images: {
            thumbnail: thumbImgArray,
            description: descImgArray
        }
    }

    return model('Board').insertMany(total);
};

Board.statics.updateList = function(data: documentType, images: imagesType){

    let thumbImgArray: imageNameType[] = [];
    if(images.thumbnail){
        thumbImgArray = images.thumbnail;
    }

    if(data.thumbnailImage){
        thumbImgArray = JSON.parse(data.thumbnailImage);
    }

    let descImgArray: imageNameType[] = [];
    if(images.description){
        descImgArray = images.description;
    }

    if(data.descriptionImage){
        descImgArray = JSON.parse(data.descriptionImage);
    }

    console.log("images", images);
    console.log("data", data);

    const total = {
        _id: data._id,
        title: data.title,
        tags: data.tags,
        description: data.description,
        writer: data.writer,
        images: {
            thumbnail: thumbImgArray,
            description: descImgArray
        }
    }

    // console.log('total', total);

    return model('Board').updateOne({_id: total._id}, total);
};

Board.statics.findAllList = function(){
    return model('Board').find({}).sort({_id: "-1"});
};
Board.statics.findOneList = function(req: Request){
    return model('Board').find({_id: req.query._id});
};
Board.statics.deleteList = function(data: documentType){
    return model('Board').deleteOne({_id: data._id}, function(err:any){
        console.log('delete Error', err);
    })
}

export default model<documentType, modelType>('Board', Board, 'board');
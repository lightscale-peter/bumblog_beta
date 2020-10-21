import {Request} from 'express'
import {Schema, model, Document, Model} from 'mongoose';

const Board = new Schema({
    // _id: String,
    title: String,
    tags: Array,
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
}

export type imagesType = {
        thumbnail?: fileObject[];
        description?: fileObject[];
    }

type fileObject = {
    originalname: string;
    filename: string;
}

interface modelType extends Model<documentType> {
    createList: (data:documentType, images: imagesType) => Promise<boolean>
    findAllList: () => Promise<documentType[]>
    findOneList: (req: Request) => Promise<documentType>
    updateList:(data:documentType) => Promise<boolean>
    deleteList: (data:documentType) => Promise<boolean>
}

Board.statics.createList = function(data: documentType, images: imagesType){

    let thumbImgArray: fileObject[] = [];
    if(images.thumbnail){
        images.thumbnail.forEach((image) => {
            thumbImgArray.push({
                originalname: image.originalname,
                filename: image.filename
            })
        })
    }

    let descImgArray: fileObject[] = [];
    if(images.description){
        images.description.forEach((image) => {
            descImgArray.push({
                originalname: image.originalname,
                filename: image.filename
            })
        })
    }

    const total = {
        ...data,
        images: {
            thumbnail: thumbImgArray,
            description: descImgArray
        }
    }

    console.log('total', total);

    return model('Board').insertMany(total);
};
Board.statics.findAllList = function(){
    return model('Board').find({}).sort({_id: "-1"});
};
Board.statics.findOneList = function(req: Request){
    return model('Board').find({_id: req.query._id});
};

Board.statics.updateList = function(data: documentType){
    return model('Board').updateOne({_id: data._id}, {...data});
};

Board.statics.deleteList = function(data: documentType){
    return model('Board').deleteOne({_id: data._id}, function(err:any){
        console.log('delete Error', err);
    })
}

export default model<documentType, modelType>('Board', Board, 'board');
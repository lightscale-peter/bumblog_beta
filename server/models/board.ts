import {Request} from 'express'
import {Schema, model, Document, Model} from 'mongoose';

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
        thumbnailImage?: imageNameType[];
        descriptionImage?: imageNameType[];
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
    if(images.thumbnailImage){
        thumbImgArray = images.thumbnailImage;
    }

    let descImgArray: imageNameType[] = [];
    if(images.descriptionImage){
        descImgArray = images.descriptionImage;
    }

    const total = {
        ...data,
        images: {
            thumbnailImage: thumbImgArray,
            descriptionImage: descImgArray
        }
    }

    return model('Board').insertMany(total);
};

Board.statics.updateList = function(data: documentType, images: imagesType){

    let thumbImgArray: imageNameType[] = [];
    if(images.thumbnailImage){
        thumbImgArray = images.thumbnailImage;
    }

    if(data.thumbnailImage){
        thumbImgArray = JSON.parse(data.thumbnailImage);   
    }

    let descImgArray: imageNameType[] = [];
    if(images.descriptionImage){
        descImgArray = images.descriptionImage;
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
            thumbnailImage: thumbImgArray,
            descriptionImage: descImgArray
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
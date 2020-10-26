import {Request} from 'express'
import {Schema, model, Document, Model} from 'mongoose';
import {stat, unlink} from 'fs';
import path from 'path';

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
    images: imagesType | string;
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


const getImageNamesById = (model: Model<documentType, modelType>, _id: string) =>{
    return new Promise<imagesType>((resolve, reject)=>{
        model.findById(_id).then((result: documentType | null)=>{
            if(result){
                if(typeof(result.images) !== 'string'){
                    resolve(result.images)
                }else{
                    reject('result-images are string type!!');;
                }
            }   
        })
    });
}
const checkImageNamesThenRemove = (images: imagesType) =>{
    return new Promise((resolve, reject) =>{
        images.thumbnailImage?.forEach((file)=>{
            checkFileThenRemove(file.filename);
        })
        images.descriptionImage?.forEach((file) =>{
            checkFileThenRemove(file.filename);
        });
        resolve();
    })
}


const checkFileThenRemove = (filename: string) =>{
    let uploadDir = path.resolve('../uploads', filename);
    if(process.env.NODE_ENV === 'production'){ // 배포 모드
        uploadDir = path.resolve('./uploads', filename);
    }
    stat(uploadDir, (err, state)=>{
        if(state){
            unlink(uploadDir, (err)=>{
                if(err){
                    console.log('remove file fail', err);
                }else{
                    console.log('remove file success');
                }
            });
        }
    });
}



const findByIdThenRemoveAfterCompare = (model: Model<documentType, modelType>, _id: string, dataFromView: imagesType) =>{
    model.findById(_id).then((result: documentType | null)=>{

        // DB의 이미지가 수정 후에도 존재하는지 없어졌는지 확인 하여 파일 삭제
        if(result){
            console.log('result from DB', result.images);
            console.log('result from VIEW', dataFromView);

            if(typeof(result.images) !== 'string'){
                result.images.thumbnailImage?.forEach((dbFile)=>{

                    let passFlag = false;

                    dataFromView.thumbnailImage?.forEach((viewFile)=>{
                        if(viewFile.filename === dbFile.filename){
                            passFlag = true; // view에서 보내온 이미지이름이 db에도 있으면 삭제 하지 않는다.
                        }
                    });

                    if(passFlag === false){
                        checkFileThenRemove(dbFile.filename);
                    }
                    
                })
                result.images.descriptionImage?.forEach((dbFile) =>{

                    let passFlag = false;

                    dataFromView.descriptionImage?.forEach((viewFile)=>{
                        if(viewFile.filename === dbFile.filename){
                            passFlag = true; // view에서 보내온 이미지이름이 db에도 있으면 삭제 하지 않는다.
                        }
                    });

                    if(passFlag === false){
                        checkFileThenRemove(dbFile.filename);
                    }
                })
            }
        }

        
    });
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

    return this.insertMany(total);
};

Board.statics.updateList = function(data: documentType, images: imagesType){
    // thumbnailImage가 images로 들어오면 새로운 이미지
    // thumbnailImage가 data로 들어오면 기존 이미지

    // console.log("images", images);
    // console.log("data", data.images);

    let thumbImgArray: imageNameType[] = [];
    if(images.thumbnailImage){ // 새로운 이미지
        images.thumbnailImage.forEach(image =>{
            thumbImgArray.push(image);
        });
    }

    if(typeof(data.images) == 'string'){ // 기존 이미지
        const images = JSON.parse(data.images);
        images.thumbnailImage.forEach((image:imageNameType) =>{
            thumbImgArray.push(image);
        });
        
    }
    
    let descImgArray: imageNameType[] = [];
    if(images.descriptionImage){ // 새로운 이미지
        images.descriptionImage.forEach(image =>{
            descImgArray.push(image);
        });
    }
    if(typeof(data.images) == 'string'){ // 기존 이미지
        const images = JSON.parse(data.images);

        images.descriptionImage.forEach((image:imageNameType) =>{
            descImgArray.push(image);
        });
        
    }

    data.images = {
        thumbnailImage: thumbImgArray,
        descriptionImage: descImgArray
    };

    findByIdThenRemoveAfterCompare(this, data._id, data.images);

    const total = {
        _id: data._id,
        title: data.title,
        tags: data.tags,
        description: data.description,
        writer: data.writer,
        images: data.images
    }

    // console.log('total_thumbnailImage', total.images.thumbnailImage);
    // console.log('total_descriptionImage', total.images.descriptionImage);


    // console.log('total', total);

    return this.updateOne({_id: total._id}, total);
};

Board.statics.findAllList = function(){
    return this.find({}).sort({_id: "-1"});
};
Board.statics.findOneList = function(req: Request){
    return this.findById(req.query._id);
};
Board.statics.deleteList = function(data: documentType){
    
    getImageNamesById(this, data._id)
    .then(checkImageNamesThenRemove);

    return this.deleteOne({_id: data._id});
}

export default model<documentType, modelType>('Board', Board, 'board');
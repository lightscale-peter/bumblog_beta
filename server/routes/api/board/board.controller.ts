import {Request, Response} from 'express';
import { stat, unlink } from 'fs';
import path from 'path';
import Board, {boardType, boardTypeDocument, imagesType} from '../../../models/board';

export const createList = (req: Request & {files: imagesType}, res: Response) =>{

    const boardData: boardType = {
        title: req.body.title,
        tags: req.body.tags,
        description: req.body.description,
        writer: req.body.writer,
        images: {
            thumbnailImage: [],
            descriptionImage: []
        }
    }
    const files = req.files;


    const setImageInfo = (boardData: boardType, files: imagesType) =>{

        // 본문에 삽입된 이미지태그에 주소 삽입
        if(files.descriptionImage){
            files.descriptionImage.forEach((file, fileIndex) => {
                boardData.description = boardData.description.replace(
                            new RegExp(`decriptionImgTag-${fileIndex+1}\"`, "gi"), 
                            `decriptionImgTag" src="/uploads/${file.filename}"`
                        );
            })
        };

        // 업로드 파일이 있는경우 해당정보 데이터에 입력 
        boardData.images.thumbnailImage = files.thumbnailImage ? files.thumbnailImage : [];
        boardData.images.descriptionImage = files.descriptionImage ? files.descriptionImage : [];

        
        return Promise.resolve(boardData);
    }

    const JsonParseTagsData = (boardData: boardType) =>{
        // 문자열로 온 태그정보 배열로 다시 변경
        boardData.tags = JSON.parse(typeof(boardData.tags) === 'string' ? boardData.tags : '');
        return Promise.resolve(boardData);
    }

    const createList = (boardData: boardType) =>{
        return Board.createList(boardData)
    }

    const respond = (newList: boardTypeDocument) =>{
        res.json(newList);
    }



    setImageInfo(boardData, files)
        .then(JsonParseTagsData)
        .then(createList)
        .then(respond);

}



export const findAllList = (req: Request, res: Response) =>{
    const respond = (boardData: boardTypeDocument[]) =>{
        res.json(boardData);
    }
    Board.findAllList().then(respond);
}


export const findOneList = (req: Request, res: Response) =>{
    const respond = (boardData: boardTypeDocument) =>{
        res.json(boardData);
    }
    Board.findOneListById(req.params.list_id).then(respond);
}


export const updateList = (req: Request & {files: imagesType}, res: Response) =>{

    const boardData: boardType = {
        _id: req.body._id,
        title: req.body.title,
        tags: req.body.tags,
        description: req.body.description,
        writer: req.body.writer,
        images: JSON.parse(req.body.images)
    }
    const files = req.files;

    const setImageInfo = (boardData: boardType, files: imagesType) =>{

        // add image src attr on description
        if(files.descriptionImage){
            files.descriptionImage.forEach((file, fileIndex) => {
                boardData.description = boardData.description.replace(
                            new RegExp(`decriptionImgTag-${fileIndex+1}\"`, "gi"), 
                            `decriptionImgTag" src="/uploads/${file.filename}"`
                        );
            })
        };

        // set images info on data
        if(files.thumbnailImage && boardData.images.thumbnailImage){
            boardData.images.thumbnailImage = boardData.images.thumbnailImage.concat(files.thumbnailImage);
        }
        if(files.descriptionImage && boardData.images.descriptionImage){
            boardData.images.descriptionImage = boardData.images.descriptionImage.concat(files.descriptionImage);
        }
        
        
        return Promise.resolve(boardData);
    }

    const JsonParseTagsData = (boardData: boardType) =>{
        boardData.tags = JSON.parse(typeof(boardData.tags) === 'string' ? boardData.tags : '');
        return Promise.resolve(boardData);
    }

    const checkFileThenRemove = (boardData: boardType) =>{
        // DB의 이미지가 수정 후에도 존재하는지 없어졌는지 확인 하여 필요 없는 파일 삭제
        if(boardData._id){
            Board.findOneListById(boardData._id).then((boardDataFromDB: boardTypeDocument)=>{

                if(boardDataFromDB){

                    console.log('result from DB', boardDataFromDB.images);
                    console.log('result from VIEW', boardData.images);

                    if(typeof(boardDataFromDB.images) !== 'string'){

                        boardDataFromDB.images.thumbnailImage?.forEach(DBimage =>{

                            let pass_flag = false;

                            if(typeof(boardData.images) !== 'string')
                            boardData.images.thumbnailImage?.forEach(image =>{
                                if(image.filename === DBimage.filename){
                                    pass_flag = true; // view에서 보내온 이미지이름이 db에도 있으면 삭제 하지 않는다.
                                }
                            });

                            if(pass_flag === false){
                                console.log('thumbnailImage Removed');
                                removeImageFile(DBimage.filename)
                            }
                        });

                        boardDataFromDB.images.descriptionImage?.forEach(DBimage =>{

                            let pass_flag = false;

                            if(typeof(boardData.images) !== 'string')
                            boardData.images.descriptionImage?.forEach(image =>{
                                if(image.filename === DBimage.filename){
                                    pass_flag = true; // view에서 보내온 이미지이름이 db에도 있으면 삭제 하지 않는다.
                                }
                            });

                            if(pass_flag === false){
                                console.log('descriptionImage Removed');
                                removeImageFile(DBimage.filename)
                            }
                        });

                    }
                }

            });
        }

        return Promise.resolve(boardData);
    }


    const updateList = (boardData: boardType) =>{
        return Board.updateList(boardData)
    }

    const respond = (updatedList: boardTypeDocument) =>{
        res.json(updatedList);
    }

    setImageInfo(boardData, files)
        .then(JsonParseTagsData)
        .then(checkFileThenRemove)
        .then(updateList)
        .then(respond);
}


export const deleteList = (req: Request, res: Response) =>{


    const {_id} = req.body;

    const removeImageWithList = (boardId: string) =>{
        Board.findOneListById(boardId).then(list =>{
            if(list){
                if(typeof(list.images) !== 'string'){
                    list.images.thumbnailImage?.forEach(image =>{
                        removeImageFile(image.filename);
                    })
                    list.images.descriptionImage?.forEach(image =>{
                        removeImageFile(image.filename);
                    })
                }
            }
        });

        return Promise.resolve(boardId);
    }

    const deleteList = (boardId: string) =>{
        return Board.deleteList(_id)
    }


    const respond = (removedData: boardTypeDocument) =>{
        res.json(removedData);
    }
    

    removeImageWithList(_id)
    .then(deleteList)
    .then(respond);

}


const removeImageFile = (filename: string) =>{
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
                    console.log('remove file success', filename);
                }
            });
        }
    });
}



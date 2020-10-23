import {NextFunction, Request, Response} from 'express';
import Board, {documentType, imagesType} from '../../../models/board';

export const createList = (req: Request & {files: imagesType}, res: Response) =>{
    const respond = (result: boolean) =>{
        res.json(result);
    }


    if(req.files.descriptionImage){
        req.files.descriptionImage.forEach((file, fileIndex) => {
            req.body.description = req.body.description
                    .replace(
                        new RegExp(`decriptionImgTag-${fileIndex+1}\"`, "gi"), 
                        `decriptionImgTag" src="/uploads/${file.filename}"`
                    );
        })
    };
    

    const data = {
        ...req.body,
        tags: req.body.tags.split(',')
    }

    Board.createList(data, req.files).then(respond);
}

export const findList = (req: Request, res: Response) =>{
    const respondOne = (result: documentType) =>{
        res.json(result);
    }
    const respondAll = (result: documentType[]) =>{
        res.json(result);
    }

    if(req.query._id){
        // findOne
        Board.findOneList(req).then(respondOne);
    }else{
        // findAll
        Board.findAllList().then(respondAll);
    }
}

export const updateList = (req: Request & {files: imagesType}, res: Response) =>{
    const respond = (result: boolean) =>{
        res.json(result);
    }

    if(req.files.descriptionImage){
        req.files.descriptionImage.forEach((file, fileIndex) => {
            req.body.description = req.body.description
                    .replace(
                        new RegExp(`decriptionImgTag-${fileIndex+1}\"`, "gi"), 
                        `decriptionImgTag" src="/uploads/${file.filename}"`
                    );
        })
    };

    const data = {
        ...req.body,
        tags: req.body.tags.split(',')
    }

    Board.updateList(data, req.files).then(respond);
}


export const deleteList = (req: Request, res: Response) =>{
    const respond = (result: boolean) =>{
        res.json(result);
    }
    console.log('deleteList query', req.query);
    if(req.body){
        Board.deleteList(req.body).then(respond);
    }
}
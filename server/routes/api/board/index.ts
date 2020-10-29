import {Router} from 'express';
import multer from 'multer';
import {v4} from 'uuid';
import path from 'path';
import {createList, findAllList, findOneList, updateList, deleteList} from './board.controller';
import {existsSync, mkdirSync} from 'fs';
import {authMiddleware} from '../../../middlewares/auth';

const router = Router();

let uploadDir = path.resolve('../uploads');
if(process.env.NODE_ENV === 'production'){ // 배포 모드
    uploadDir = path.resolve('./uploads');
}

const uuid = () =>{
    const uuid4 = v4().split('-');
    return uuid4[2] + uuid4[1] + uuid4[0] + uuid4[3] + uuid4[4];
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, uploadDir);
        },
        filename: (req, file, cb)=>{
            // console.log('file', file);
            cb(null, uuid() + path.extname(file.originalname));
        }
    }),
});

const createFolder = () =>{
    if(!existsSync(uploadDir)){
        mkdirSync(uploadDir);
    }
}

createFolder();

// CRUD
router.post('/list',upload.fields([{name: 'thumbnailImage', maxCount: 1}, {name: 'descriptionImage', maxCount: 10}]), createList);
router.get('/list', findAllList);
router.get('/list/:list_id', findOneList);

// router.put('/list', authMiddleware);
router.put('/list', upload.fields([{name: 'thumbnailImage', maxCount: 1}, {name: 'descriptionImage', maxCount: 10}]), updateList);

// router.delete('/list', authMiddleware);
router.delete('/list', deleteList);

export default router;

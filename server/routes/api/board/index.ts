import {Router} from 'express';
import multer from 'multer';
import {v4} from 'uuid';
import path from 'path';
import {createList, findList, updateList, deleteList} from './board.controller';

const router = Router();

const uuid = () =>{
    const uuid4 = v4().split('-');
    return uuid4[2] + uuid4[1] + uuid4[0] + uuid4[3] + uuid4[4];
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb)=>{
            let uploadDir = path.resolve('../uploads');
            if(process.env.NODE_ENV === 'production'){ // 배포 모드
                uploadDir = path.resolve('./uploads');
            }
            cb(null, uploadDir);
        },
        filename: (req, file, cb)=>{
            // console.log('file', file);
            cb(null, uuid() + path.extname(file.originalname));
        }
    }),
});

// CRUD
router.post('/list',upload.fields([{name: 'thumbnail', maxCount: 1}, {name: 'description', maxCount: 10}]), createList);
router.get('/list', findList);
router.put('/list', updateList);
router.delete('/list', deleteList);

export default router;

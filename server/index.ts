import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes/api'
import path from 'path';
import {bumblog} from './config/bumblog.config';

// const config = require('./config/private.config');
// const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8001;

let buildDir = path.resolve(__dirname, '../build'); // 개발 모드

if(process.env.NODE_ENV === 'production'){ // 배포 모드
    console.log('배포 모드');
    buildDir = path.resolve(__dirname, './build');
}

console.log('buildDir', buildDir);

// app.use(morgan('dev'));
app.set('jwt-secret', bumblog.secret);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// console.log('ddsdsaad', path.join(buildDir, "index.html"));
// app.use("/*", express.static(buildDir));
// app.get("/*", (req:Request, res:Response) =>{
//     res.sendFile(path.join(buildDir, "index.html"));
// });

app.use('/', express.static(buildDir));
app.use('/board', express.static(buildDir));
app.use('/board/view', express.static(buildDir));
app.use('/board/write', express.static(buildDir));

app.use('/api', router);

//Express 서버 완료시
app.listen(port, ()=>{
    console.log(`[express] Express server is running on port ${port}`)
});

// MongoDB
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', ()=>{
    console.log('[mongoose] connected to mongodb server');
});
mongoose.set('debug', true);
mongoose.connect(bumblog.mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
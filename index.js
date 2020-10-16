const express = require('express');
const mongoose = require('mongoose');
const config = require('./server/config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 8001;


app.use(morgan('dev'));
app.set('jwt-secret', config.secret);


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/build'));
app.use('/api', require('./server/routes/api'));

//리액트 파일 열기
// app.get("*", (req, res) =>{
//     res.sendFile(__dirname + '/build/index.html');
// });

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

mongoose.connect(config.mongodbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
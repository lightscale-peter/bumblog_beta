const express = require('express');
const mongoose = require('mongoose');
const config = require('./server/config');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8001;


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use('/', express.static(__dirname + '/build'));
app.use('/api', require('./server/routes/api'));

app.get("*", (req, res) =>{
    res.sendFile(__dirname + '/build/index.html');
});

// app.use('/board', express.static(__dirname + '/build'));
// app.use('/api', require('./server/routes/api'));

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
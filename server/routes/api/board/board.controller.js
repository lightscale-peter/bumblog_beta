const Board = require('../../../models/board');

exports.createList = (req, res) =>{
    const respond = (result) =>{
        res.json(result);
    }
    Board.createList(req.query).then(respond);
}

exports.findList = (req, res) =>{
    const respond = (result) =>{
        res.json(result);
    }
    if(req.query._id){
        // findOne
        Board.findOneList(req.query).then(respond);
    }else{
        // findAll
        Board.findAllList(req.query).then(respond);
    }
}


exports.updateList = (req, res) =>{
    const respond = (result) =>{
        res.json(result);
    }
    if(req.query._id){
        Board.updateList(req.query).then(respond);
    }
}


exports.deleteList = (req, res) =>{
    const respond = (result) =>{
        res.json(result);
    }
    console.log('deleteList query', req.query);
    if(req.query._id){
        Board.deleteList(req.query).then(respond);
    }
}


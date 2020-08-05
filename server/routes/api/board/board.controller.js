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

}


exports.deleteList = (req, res) =>{

}


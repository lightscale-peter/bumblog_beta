const Board = require('../../../models/board');





exports.createList = (req, res) =>{

}

exports.findAllList = (req, res) =>{
    const respond = (result) =>{
        res.json(result)
    }
    Board.findAllList().then(respond);
}

exports.findOneList = (req, res) =>{
    const respond = (result) =>{
        res.json(result)
    }

    Board.findOneList(req.query).then(respond);
}

exports.updateList = (req, res) =>{

}


exports.deleteList = (req, res) =>{

}


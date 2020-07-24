const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema({
    title: String,
    desc: String,
    writer: String
});


Board.statics.createList = function(){

};

Board.statics.findAllList = function(){
    return this.find({});
};
Board.statics.findOneList = function(data){
    // console.log("data", data)
    return this.find({_id: data._id});
};

Board.statics.updateList = function(){

};

Board.statics.deleteList = function(){

}

module.exports = mongoose.model('Board', Board, 'board');
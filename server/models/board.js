const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema({
    title: String,
    subTitle: String,
    description: String,
    writer: String
});


Board.statics.createList = function(data){
    console.log('data', data);

    return this.insertMany(data);

};

Board.statics.findAllList = function(){
    return this.find({}).sort({_id: "-1"});
};
Board.statics.findOneList = function(data){

    return this.find({_id: data._id});

};

Board.statics.updateList = function(){

};

Board.statics.deleteList = function(){

}

module.exports = mongoose.model('Board', Board, 'board');
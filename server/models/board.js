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

Board.statics.updateList = function(data){
    return this.updateOne({_id: data._id}, {...data});
};

Board.statics.deleteList = function(data){
    return this.deleteOne({_id: data._id}, function(err){
        console.log('delete Error', err);
    })
}

module.exports = mongoose.model('Board', Board, 'board');
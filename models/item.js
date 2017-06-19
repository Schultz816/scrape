const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema= new Schema({
    date: {type: Date, default: Date.now},
    category: String,
    link: String,
    title: String,
    body: String,
    image: String,
    issue: {type: Schema.Types.ObjectId, ref: 'Issue'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

const ItemModel = mongoose.model('Item',itemSchema);

module.exports=ItemModel; 
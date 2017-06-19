const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema= new Schema({
    issue: String,
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});

const IssueModel = mongoose.model('Issue',issueSchema);

module.exports=IssueModel; 
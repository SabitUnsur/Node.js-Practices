const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name:{
    type: Schema.Types.String,
    required:true,
    },
    teams: [{
      type: Schema.Types.ObjectId, //like foreign key
      ref: "Team"
    }]
}, {
    autoIndex:true,
    timestamps:true,
    minimize:true,
});



const Country = mongoose.model('Country', countrySchema,'country');  // Animal is the collection name
module.exports = Country;

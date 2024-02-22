const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name:{
    type: Schema.Types.String,
    required:true,
    },
    team_year : {
        type: Schema.Types.Number,
        required:true,
    },
    countryId: {
        type: Schema.Types.ObjectId, //like foreign key
        ref: "Country"
      }
}, {
    autoIndex:true,
    timestamps:true,
    minimize:true,
});



const Team = mongoose.model('Team', teamSchema,'team');  // Animal is the collection name
module.exports = Team;

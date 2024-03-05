const mongoose = require('mongoose')
const Schema = mongoose.Schema

const titleSchema = new Schema({ 
    name: {
        type: Schema.Types.String,
        required: true
    },
    persons: [{
        type: Schema.Types.ObjectId,
        ref: 'Person'
    }]
}, {
    minimize: true,
    timestamps: true,
    autoIndex: true
})

const Title = mongoose.model('Title', titleSchema,'title')

module.exports = Title
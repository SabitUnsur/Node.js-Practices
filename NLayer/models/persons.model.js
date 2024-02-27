const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personSchema = new Schema({ 
    name: {
        type: Schema.Types.String,
        required: true
    },
    surname: {
        type: Schema.Types.String,
        required: true
    },
    birthDate : {
        type: Schema.Types.Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    salary: {
        type: Schema.Types.Number,
        required: true
    },
    tcNumber: {
        type: Schema.Types.String,
        required: true,
        min:11,
        max:11
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
            type: Schema.Types.String,
            required: true,
            min: 8
    },
    avatar: {
        type: Schema.Types.String,
        required: true
    },
    cvFile:{
        type: Schema.Types.String,
        required: true
    },
    country:{
        type: Schema.Types.String,
        required: true
    },
    city:{
        type: Schema.Types.String,
        required: true
    },
    company:{
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    title:{
        type: Schema.Types.ObjectId,
        ref: 'Title'
    }
}, {
    minimize: true,
    timestamps: true,
    autoIndex: true
})

const Person = mongoose.model('Person', personSchema, 'person')

modukle.exports = Person
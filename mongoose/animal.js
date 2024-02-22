const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const animalSchema = new Schema({
    name:{
    type: Schema.Types.String,
    required:true,
    validate : () => Promise.resolve(true)  //model validation
   // unique:true
    },
    family:{
        type: Schema.Types.String,
        required: [true, 'Family is required'] //model validation
    },
    age:{
        type: Schema.Types.Number,
        required:function(){
            return this.age>3
        },
    },
    live_area:{
        type: Schema.Types.Array,
        validate:{
            validator:function(value){
                return value.length < 2
            },
            message:'Live area should have at least 2 area'
        }
    }
}, {
    _id:true,
    autoIndex:true,
    timestamps:true,
    id:true,
    minimize:true,
    validateBeforeSave:true,
});

animalSchema.statics.findByAnimalName = function (name){
    console.log('merhaba')
    return this.find({name})
}

animalSchema.query.byFamily = function(family){ 
    return this.where({family})
}

animalSchema.virtual('animalFamily').get(function(){ 
    console.log('getter')
    return this.family + '-' + this.name
 }).set(function(val){
    console.log('setter')
     this.name = val.toUpperCase() 
 })

 animalSchema.pre('save', (next) => {
    console.log('save Middleware calisiyor') 
    next()
  })

const Animal = mongoose.model('Animal', animalSchema,'animal');  // Animal is the collection name
module.exports = Animal;

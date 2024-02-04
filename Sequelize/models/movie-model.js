const { DataTypes } = require('sequelize')
const db = require('../db')

const Movie = db.sequelize.define('Movie',{
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    
    },
    movie_name: {
        type : DataTypes.STRING({length: 50}),
    },


},{
    charset:'UTF8',
    createdAt:true,
    updatedAt:true,
    modelName:'Movie',
    tableName:'movie',
    timestamps:true,
    underscored:true,
    version:true,
    underscored:true
})


module.exports = Movie
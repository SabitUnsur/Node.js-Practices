const { DataTypes } = require('sequelize')
const db = require('../db')

const Actor_Movie = db.sequelize.define('Actor_Movie',{
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    
    },
    actor_name: {
        type : DataTypes.STRING({length: 50}),
    },


},{
    charset:'UTF8',
    createdAt:true,
    updatedAt:true,
    modelName:'Actor_Movie',
    tableName:'actor_movie',
    timestamps:true,
    underscored:true,
    version:true,
    underscored:true
})


module.exports = Actor_Movie
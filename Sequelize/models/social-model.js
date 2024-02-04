const { DataTypes } = require('sequelize')
const db = require('../db')

const Socials = db.sequelize.define('Socials',{
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    
    },
    SocialMediaName: {
        type : DataTypes.STRING({length: 50}),
    },


},{
    charset:'UTF8',
    createdAt:true,
    updatedAt:true,
    modelName:'Socials',
    tableName:'social',
    timestamps:true,
    underscored:true,
    version:true,
    underscored:true
})


module.exports = Socials
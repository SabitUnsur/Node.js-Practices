const { DataTypes } = require('sequelize')
const db = require('../db')

const Test = db.sequelize.define('Test',{
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        field: 'test_id'
    },
    testAd: {
        type : DataTypes.STRING({length: 50}),
        defaultValue: 'Ali',
        get(){
            const val = this.getDataValue('testAd')
            return val.toUpperCase() + " - get"
        },
        set(val){
            this.setDataValue('testAd', val.toUpperCase())
        }
    },
    testSoyad: {
        type : DataTypes.CHAR({length: 50}),
        validate: {
          isEmail:{
            msg: 'Lütfen geçerli bir email adresi giriniz'
          },
          customValidate(value){
            if(value === "sabit"){
                throw new Error('Sabit değeri girilemez')
            }      
          }
        },
        defaultValue: 'Veli'
    },
    testFullName: {
        type: DataTypes.VIRTUAL,
        get(){
            return `${this.testAd} ${this.testSoyad}`
        }
    }
},{
    charset:'UTF8',
    createdAt:true,
    updatedAt:true,
    modelName:'Test',
    name:'test',
    tableName:'test',
    timestamps:true,
    underscored:true,
    version:true,
    hooks: {
        beforeValidate:(model) =>{
            console.log('beforeValidate çalıştı')
        }
    }
})

Test.addHook('afterCreate', (model) => {
    //git mail at gibi işlemler yapılabilir
    console.log('afterCreate çalıştı')
})

module.exports = Test
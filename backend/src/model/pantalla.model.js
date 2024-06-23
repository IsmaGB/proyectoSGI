const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize= require("../config/database");


class Pantalla extends Model{}

Pantalla.init({
    CN_Id_Pantalla:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
    },
    CT_Descripcion:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize,
    modelName: 'Pantalla',
    tableName: 't_pantallas',
    timestamps:false
});


module.exports=Pantalla;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize= require("../config/database");

class Riesgo extends Model{}

Riesgo.init({
    CN_Id_Riesgo:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true, 
    },
    CT_Descripcion:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    CT_Nombre_Sistema:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    CT_Activo:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    sequelize,
    modelName: 'Riesgo',
    tableName: 't_riesgo',
    timestamps:false

});
module.exports=Riesgo;
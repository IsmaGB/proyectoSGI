const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize= require("../config/database");

class Afectacion extends Model{}

Afectacion.init({
    CN_Id_Afectacion:{
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
    modelName: 'Afectacion',
    tableName: 't_afectacion',
    timestamps:false

});
module.exports=Afectacion;

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize= require("../config/database");

class Prioridad extends Model{}

Prioridad.init({
    CN_Id_Prioridad:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
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
    modelName: 'Prioridad',
    tableName: 't_prioridad',
    timestamps:false

});
module.exports=Prioridad;
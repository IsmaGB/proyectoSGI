const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize= require("../config/database");

class Categoria extends Model{}

Categoria.init({
    CN_Id_Categoria:{
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
    modelName: 'Categoria',
    tableName: 't_categoria',
    timestamps:false

});
module.exports=Categoria;
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize= require("../config/database");


class Roles extends Model{}

Roles.init({
    CN_Id_Rol:{
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
    CN_Activo:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    sequelize,
    modelName: 'Roles',
    tableName: 't_roles',
    timestamps:false
});


module.exports=Roles;
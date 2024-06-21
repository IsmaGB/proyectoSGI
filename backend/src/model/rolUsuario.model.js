const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize= require("../config/database");
const Usuario=require("../model/usuario.model");
const Roles=require("../model/roles.model");

class RolUsuario extends Model{}

RolUsuario.init({
    CN_Id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    CT_Usuario:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model:Usuario,
            key:'CT_Usuario'
        }
    },
    CN_Id_Rol:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Roles,
            key:'CN_Id_Rol'
        }
    }
},{
    sequelize,
    modelName: 'RolUsuario',
    tableName: 't_usuario_rol',
    timestamps:false
});

RolUsuario.belongsTo(Usuario,{ foreignKey: 'CT_Usuario'});
Usuario.hasMany(RolUsuario,{foreignKey: 'CT_Usuario'});

RolUsuario.belongsTo(Roles,{ foreignKey: 'CN_Id_Rol'});
Roles.hasMany(RolUsuario,{foreignKey: 'CN_Id_Rol'});

module.exports=RolUsuario;
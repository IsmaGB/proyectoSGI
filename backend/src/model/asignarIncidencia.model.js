const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize= require("../config/database");
const Usuario=require("../model/usuario.model");
const {Incidencia}=require("../model/incidencia.model");

class AsignarIncidencia extends Model{}

AsignarIncidencia.init({
    Id:{
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
    CN_Id_Incidencia:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model:Incidencia,
            key:'CN_Id_Incidencia'
        }
    }
},{
    sequelize,
    modelName: 'AsignarIncidencia',
    tableName: 't_asignar_incidencia',
    timestamps:false
});

AsignarIncidencia.belongsTo(Usuario,{ foreignKey: 'CT_Usuario'});
Usuario.hasMany(AsignarIncidencia,{foreignKey: 'CT_Usuario'});

AsignarIncidencia.belongsTo(Incidencia,{ foreignKey: 'CN_Id_Incidencia'});
Incidencia.hasMany(AsignarIncidencia,{foreignKey: 'CN_Id_Incidencia'});

module.exports=AsignarIncidencia;
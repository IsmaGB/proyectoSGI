const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize= require("../config/database")

class Estado extends Model {}
Estado.init({
    CN_Id_Estado:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    CT_Descripcion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    CT_Nombre_Sistema:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CN_Activo:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
},{
sequelize,
modelName: 'Estado',
tableName: 't_estados',
timestamps: false
}
);
module.exports=Estado;
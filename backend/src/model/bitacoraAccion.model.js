const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize= require("../config/database")
const Usuario=require("../model/usuario.model")

class BitacoraAccion extends Model {}

BitacoraAccion.init({
    CN_Id_Bitacoras_Accion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CT_Nombre_Sistema: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CT_Nombre_Referencia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CT_Usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Usuario, // Nombre del modelo referenciado
            key: 'CT_Usuario' // Clave referenciada en la tabla t_usuarios
        }
    },
}, {
    sequelize,
    modelName: 'BitacoraAccion',
    tableName: 't_bitacoras_accion',
    timestamps: false
});

// Establecer la relación de clave foránea
BitacoraAccion.belongsTo(Usuario, { foreignKey: 'CT_Usuario' });
Usuario.hasMany(BitacoraAccion, { foreignKey: 'CT_Usuario' });

module.exports = BitacoraAccion;
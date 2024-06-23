const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize= require("../config/database")
const Usuario=require("../model/usuario.model");
const Pantalla = require('./pantalla.model');

class BitacoraAccion extends Model {}

const generarFechaHoraBi = () => {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Los meses son base 0, por eso sumamos 1
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const separadorFecha = "/";
    const separadorHora = ":";

    const timestamp = `${year}${separadorFecha}${month}${separadorFecha}${day}|${hours}${separadorHora}${minutes}${separadorHora}${seconds}`;

    return timestamp; // Devuelve directamente el timestamp como una cadena
};


BitacoraAccion.init({
    CN_Id_Bitacoras_Accion: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    CT_Nombre_Sistema: {
        type: DataTypes.STRING,
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
    CT_Id_Pantalla:{
        type: DataTypes.STRING,
        allowNull:false,
        references: {
            model: Pantalla, // Nombre del modelo referenciado
            key: 'CT_Id_Pantalla' // Clave referenciada en la tabla t_usuarios
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

BitacoraAccion.belongsTo(Pantalla, { foreignKey: 'CT_Id_Pantalla' });
Pantalla.hasMany(BitacoraAccion, { foreignKey: 'CT_Id_Pantalla' });

module.exports = {BitacoraAccion, generarFechaHoraBi};
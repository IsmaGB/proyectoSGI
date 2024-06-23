const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize= require("../config/database")
const Estado= require("../model/estado.model")
const Usuario= require("../model/usuario.model");
const Prioridad = require('./prioridad.model');
const Riesgo = require('./riesgo.model');
const Afectacion = require('./afectacion.model');
const Categoria = require('./categoria.model');
class Incidencia extends Model {}


// Función para generar el ID de la incidencia
const generateIncidenciaId = async () => {
    const year = new Date().getFullYear().toString();
    const lastIncidencia = await Incidencia.findOne({
        order: [['createdAt', 'DESC']]
    });

    let newIdNumber = '000001';
    if (lastIncidencia) {
        const lastId = lastIncidencia.CN_Id_Incidencia;
        const lastIdNumber = parseInt(lastId.split('-')[1], 10);
        newIdNumber = (lastIdNumber + 1).toString().padStart(6, '0');
    }

    return `${year}-${newIdNumber}`;
};


Incidencia.init(
    {
        CN_Id_Incidencia: {
            type: DataTypes.STRING, 
            primaryKey: true,
        },
        CN_Id_Estado: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Estado, // Nombre del modelo referenciado
                key: 'CN_Id_Estado', // Clave referenciada en la tabla t_estados
            }
        },
        CT_Usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Usuario, // Nombre del modelo referenciado
                key: 'id', // Clave referenciada en la tabla t_estados
            }
        },
        CT_Titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CT_Descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CT_Lugar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CN_Costos: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CN_Duracion: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        CN_Id_Prioridad:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Prioridad, // Nombre del modelo referenciado
                key: 'CN_Id_Prioridad',
            }
        },
        CN_Id_Riesgo:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Riesgo, // Nombre del modelo referenciado
                key: 'CN_Id_Riesgo',
            }
        },
        CN_Id_Afectacion:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Afectacion, // Nombre del modelo referenciado
                key: 'CN_Id_Afectacion',
            }
        },
        CN_Id_Categoria:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Categoria, // Nombre del modelo referenciado
                key: 'CN_Id_Categoria',
            }
        },
        CT_Imagen:{
            type: DataTypes.TEXT('long'),
            allowNull: true,
        },
        justificacionCierre:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Incidencia',
        tableName: 't_incidencias',
        timestamps: true,
    });
    Incidencia.belongsTo(Estado, { foreignKey: 'CN_Id_Estado' });
    Estado.hasMany(Incidencia, { foreignKey: 'CN_Id_Estado' });

    Incidencia.belongsTo(Usuario, { foreignKey: 'CT_Usuario' });
    Usuario.hasMany(Incidencia, { foreignKey: 'CT_Usuario' });

    Incidencia.belongsTo(Prioridad, { foreignKey: 'CN_Id_Prioridad' });
    Prioridad.hasMany(Incidencia, { foreignKey: 'CN_Id_Prioridad' });

    Incidencia.belongsTo(Riesgo, { foreignKey: 'CN_Id_Riesgo' });
    Riesgo.hasMany(Incidencia, { foreignKey: 'CN_Id_Riesgo' });

    Incidencia.belongsTo(Afectacion, { foreignKey: 'CN_Id_Afectacion' });
    Afectacion.hasMany(Incidencia, { foreignKey: 'CN_Id_Afectacion' });

    Incidencia.belongsTo(Categoria, { foreignKey: 'CN_Id_Categoria' });
    Categoria.hasMany(Incidencia, { foreignKey: 'CN_Id_Categoria' });

module.exports = { Incidencia, generateIncidenciaId };


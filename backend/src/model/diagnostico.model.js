const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize= require("../config/database")
const {Incidencia}=require("../model/incidencia.model")
const Usuario= require("../model/usuario.model")

class Diagnostico extends Model {}

const generarFechaHora = async () => {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Los meses son base 0, por eso sumamos 1
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const separadorFecha= "/";
    const separadorHora= ":";
    
    const timestamp = `${year}${separadorFecha}${month}${separadorFecha}${day}|${hours}${separadorHora}${minutes}`;

    return timestamp;
};


Diagnostico.init({
    CN_Id_Diagnostico:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    CT_Fecha_Hora:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    CT_Diagnostico:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    CN_Id_Incidencia:{
        type: DataTypes.STRING,
        allowNull: false,
        references:{
            model: Incidencia,
            key: 'CN_Id_Incidencia'
        }
    },
    CT_Requiere_Compra:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    CT_Tiempo_Estimado:
    {
        type: DataTypes.STRING,
        allowNull:false,
    },
    CT_Observaciones:{
        type: DataTypes.STRING,
        allowNull:false
    },
    CT_Usuario:{
        type: DataTypes.STRING,
        allowNull: false,
        references:{
            model:Usuario,
            key: 'CT_Usuario'
        }
    }
},{
sequelize,
modelName: 'Diagnostico',
tableName: 't_diagnostico',
timestamps:false
});

Diagnostico.belongsTo(Incidencia,{ foreignKey: 'CN_Id_Incidencia'});
Incidencia.hasMany(Diagnostico,{foreignKey: 'CN_Id_Incidencia'});

Diagnostico.belongsTo(Usuario,{ foreignKey: 'CT_Usuario'});
Usuario.hasMany(Diagnostico,{foreignKey: 'CT_Usuario'});

module.exports={Diagnostico, generarFechaHora};
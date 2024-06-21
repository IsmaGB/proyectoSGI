const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('sgibd', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    port: "3306"
});

class Usuario extends Model {}
Usuario.init({
    CT_Codigo_Usuario: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    CT_Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CT_Contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CT_Usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    CN_Numero_Telefonico: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    CT_Puesto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    CT_Id_Departamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: "Usuario",
    tableName: "usuarios",
    timestamps: true, // Esto habilita automáticamente createdAt y updatedAt
});


module.exports = Usuario;

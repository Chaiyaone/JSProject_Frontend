const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://webadmin:EHPopd78174@node73591-noderestthu.proen.app.ruk-com.cloud:11798/ReportIssue');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Role: {
        type: DataTypes.ENUM('user', 'technician', 'admin'),
        allowNull: false,
        defaultValue: 'user'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;
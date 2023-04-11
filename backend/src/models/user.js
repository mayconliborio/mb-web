const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
})

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identificacaoFiscal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataRegistro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoPessoa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

sequelize.sync().then((r) => r)

module.exports = User

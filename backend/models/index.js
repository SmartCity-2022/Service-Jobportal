const {Sequelize} = require('sequelize')
const config = require('../config')

let sequelize
sequelize = new Sequelize(config.db_url)

const Citizen = require('./citizen')(sequelize)
const Job = require('./job')(sequelize)
const Company = require('./company')(sequelize)
const Application = require('./application')(sequelize)

Citizen.hasMany(Application, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Application.belongsTo(Citizen) 

Citizen.hasMany(Company, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Company.belongsTo(Citizen)

Job.hasMany(Application, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Application.belongsTo(Job)

Company.hasMany(Job, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Job.belongsTo(Company)
  
module.exports = sequelize

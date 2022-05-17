const {Sequelize} = require('sequelize')
const config = require('../config')

module.exports = () => {
  let sequelize
  sequelize = new Sequelize(config.databaseUrl)

  const Citizen = require('./citizen')(sequelize)
  const Job = require('./job')(sequelize)
  const Company = require('./company')(sequelize)
  const Application = require('./application')(sequelize)

  Citizen.hasMany(Application)
  Application.belongsTo(Citizen)

  Citizen.hasMany(Company)
  Company.belongsTo(Citizen)

  Job.hasMany(Application)
  Application.belongsTo(Job)

  Company.hasMany(Job)
  Job.belongsTo(Company)

  sequelize.sync().then(console.log("Connection etablished"))
  
  return sequelize
}
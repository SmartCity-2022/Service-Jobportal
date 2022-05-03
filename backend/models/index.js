const {Sequelize} = require('sequelize')
const config = require('../config')

module.exports = () => {
  let sequelize
  sequelize = new Sequelize(config.databaseUrl)

  sequelize.sync().then(console.log("Connection etablished"))

  const Citizen = require('./citizen')(sequelize)
  const Job = require('./job')(sequelize)
  const Company = require('./company')(sequelize)
  const Application = require('./application')(sequelize)

  Citizen.hasMany(Application)
  Citizen.hasMany(Company)

  Job.hasMany(Application)

  Company.hasMany(Job)

  return sequelize
}
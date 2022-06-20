const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  const Application = sequelize.define(
    'Application',
    {
      document: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: null
      },
      description: {
        type: DataTypes.STRING
      }
    }
  )
  return Application
}

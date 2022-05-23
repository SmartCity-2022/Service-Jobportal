const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  const Application = sequelize.define(
    'Application',
    {
      document: {
        type: DataTypes.STRING
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      response: {
        type: DataTypes.BOOLEAN
      }
    }
  )
  return Application
}

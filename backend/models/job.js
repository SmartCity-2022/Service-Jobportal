const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  const Job = sequelize.define(
    'Job',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      field: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      worktime: {
        type: DataTypes.STRING,
        allowNull: false
      },
      availableAt: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      conditions: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }
  )
  return Job
}

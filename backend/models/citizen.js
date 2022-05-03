const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  const Citizen = sequelize.define(
    'Citizen',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }
  )
  
  return Citizen
}
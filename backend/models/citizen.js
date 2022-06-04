const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  const Citizen = sequelize.define(
    'Citizen',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }
  )
  
  return Citizen
}

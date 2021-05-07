'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  Student.init({
    full_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nisn: {
      type: DataTypes.CHAR(5),
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'nophoto.png'
    },
    class: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    major: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Student'
  })
  return Student
}

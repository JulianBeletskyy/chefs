"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(sequelize, DataTypes) {
  var Meal = sequelize.define('Meal', {
    mealId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
        as: 'userId'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      get: function get() {
        return "http://localhost:3001/".concat(this.getDataValue('imgUrl'));
      }
    }
  }, {
    hooks: {}
  });

  Meal.associate = function (models) {
    Meal.belongsTo(models.User, {
      as: 'chef',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return Meal;
};

exports.default = _default;
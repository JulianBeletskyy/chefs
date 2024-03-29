import bcryptjs from 'bcryptjs'

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      bussinesName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      role: {
        type: DataTypes.ENUM('client', 'chef', 'admin'),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        defaultValue: ''
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null
      },
      lng: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      passwordTokenExpiry: {
        type: DataTypes.BIGINT,
        allowNull: true
      }
    },
    {
      hooks: {
        beforeCreate: user => User.hashPassword(user),
      }
    }
  );

  User.associate = models => {
    User.hasMany(models.Meal, {
      foreignKey: 'userId',
      as: 'meals'
    });
  };

  User.hashPassword = async user => {
    const hash = await bcryptjs.hash(user.password, process.env.SALT_ROUNDS*1)
    return user.setDataValue('password', hash)
  };

  return User;
};


export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      bussinesName: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      role: {
        type: Sequelize.ENUM('client', 'chef', 'admin'),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
        defaultValue: ''
      },
      lat: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null
      },
      lng: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passwordResetToken: {
        type: Sequelize.STRING,
        allowNull: true
      },
      passwordTokenExpiry: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
}
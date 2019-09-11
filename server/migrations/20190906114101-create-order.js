export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      clientId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      chefId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      meals: {
        type: Sequelize.JSON,
        allowNull: true
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null
      },
      delivery: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      deliveryPrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
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
    return queryInterface.dropTable('Orders');
  }
};
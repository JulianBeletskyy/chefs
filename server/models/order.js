'use strict';
export default (sequelize, DataTypes) => {
  	const Order = sequelize.define(
	'Order',
	{
    	orderId: {
	        type: DataTypes.UUID,
	        primaryKey: true,
	        defaultValue: DataTypes.UUIDV4,
	        allowNull: false
      	},
      	clientId: {
	        type: DataTypes.UUID,
	        defaultValue: DataTypes.UUIDV4,
	        allowNull: false
      	},
      	chefId: {
	        type: DataTypes.UUID,
	        defaultValue: DataTypes.UUIDV4,
	        allowNull: false
      	},
      	meals: {
	        type: DataTypes.JSON,
	        allowNull: true
      	},
      	price: {
	        type: DataTypes.FLOAT,
	        allowNull: true,
	        defaultValue: null
      	},
      	delivery: {
	        type: DataTypes.BOOLEAN,
	        allowNull: false,
	        defaultValue: false
      	},
      	deliveryPrice: {
	        type: DataTypes.FLOAT,
	        allowNull: true,
	        defaultValue: null
      	},
      	status: {
	        type: DataTypes.STRING,
	        allowNull: true,
	        defaultValue: null
	      },
  	}, {

  	});
  	Order.associate = models => {
    	
  	};
  	return Order;
};
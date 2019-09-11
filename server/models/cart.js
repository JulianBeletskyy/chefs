export default (sequelize, DataTypes) => {
  	const Cart = sequelize.define(
	  	'Cart', 
	  	{
		    userId: {
		        type: DataTypes.UUID,
		        defaultValue: DataTypes.UUIDV4,
		        allowNull: false
	      	},
	      	mealId: {
		        type: DataTypes.UUID,
		        defaultValue: DataTypes.UUIDV4,
		        allowNull: false
	      	},
	      	quantity: {
		        type: DataTypes.INTEGER,
		        defaultValue: 0,
		        allowNull: false
	      	},
	  	},
	  	{
	  		tableName: 'CartUserMeal'
	  	}
  	)
  	return Cart
}
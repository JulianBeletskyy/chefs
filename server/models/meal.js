export default (sequelize, DataTypes) => {
  const Meal = sequelize.define(
  	'Meal',
  	{
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
	        allowNull: true,
	  	},
	  	ingredients: {
	        type: DataTypes.STRING,
	        allowNull: true,
	  	},
	  	weight: {
	        type: DataTypes.INTEGER,
	        allowNull: true,
	        defaultValue: 0
	  	},
	  	imgUrl: {
	        type: DataTypes.STRING,
	        allowNull: true,
	        get() {
	        	return `http://localhost:3001/${this.getDataValue('imgUrl')}`
	        } 
	  	},
  	}, {
  		hooks: {
  			
  		} 
  	});
	Meal.associate = models => {
		Meal.belongsTo(models.User, {
      		as: 'chef',
      		foreignKey: 'userId',
      		onDelete: 'CASCADE',
	    })
	};
  	return Meal;
};
import * as types from '../actions/types'

const initialState = {
    list: [],
}

const meals = (meals = initialState, action = {}) => {
    switch (action.type) {
        case types.SET_MEALS_KEY:
            return Object.assign({}, meals, {
                [action.key]: action.data,
            })
        case types.ADD_MEAL_KEY:
        	return Object.assign({}, meals, {
        		[action.key]: [action.data, ...meals[action.key]]
        	})
        case types.UPDATE_MEALS_BY_ID:
            return Object.assign({}, meals, {
                list: meals.list.map(meal => {
                    if (meal.mealId === action.mealId) {
                        return {...meal, ...action.data}
                    }
                    return meal
                })
            })
        default:
            return meals
    }
}

export default meals

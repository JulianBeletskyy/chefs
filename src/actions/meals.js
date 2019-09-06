import { get, file } from '../api'
import * as types from '../actions/types'

export const getMeals = () => dispatch => {
	return get(`meals`).then(res => {
		if (res.statusCode === 200) {
			dispatch(setMealsKey('list', res.meals))
		}
	})
}

export const createMeal = data => dispatch => {
	const formData = new FormData()
	Object.keys(data).forEach(key => {
		formData.append(key, data[key])
	})
	return file(`meals`, formData, true).then(res => {
		if (res.statusCode === 200) {
			dispatch(addMealsKey('list', res.meal))
		}
		return res.statusCode === 200
	})
}

export const updateMeal = (meal, mealId) => dispatch => {
	const formData = new FormData()
	Object.keys(meal).forEach(key => {
		formData.append(key, meal[key])
	})
	return file(`meals/${mealId}`, formData, true).then(res => {
		if (res.statusCode === 200) {
			dispatch(updateMealsById(mealId, res.meal))
		}
		return res.statusCode === 200
	})
}

export const setMealsKey = (key, data) => ({
	type: types.SET_MEALS_KEY,
	key,
	data,
})

export const addMealsKey = (key, data) => ({
	type: types.ADD_MEAL_KEY,
	key,
	data,
})

export const updateMealsById = (mealId, data) => ({
	type: types.UPDATE_MEALS_BY_ID,
	mealId,
	data,
})

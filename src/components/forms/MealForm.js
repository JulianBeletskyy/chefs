import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextField from '../inputs/TextField'
import TextArea from '../inputs/TextArea'
import UploadField from '../inputs/UploadField'
import BtnMain from '../buttons/BtnMain'
import { createMeal, updateMeal } from '../../actions/meals'

const mealStruct = {
	name: '',
	price: '',
	description: '',
	ingredients: '',
	weight: '',
	imgUrl: null
}

const MealForm = ({closeMe, meal}) => {
	const dispatch = useDispatch()
	const [form, setForm] = useState(meal.mealId ? meal : mealStruct)
	const handleChange = (field, val) => {
		setForm({...form, [field]: val})
	}
	const save = e => {
		e.preventDefault()
		if (meal.mealId) {
			dispatch(updateMeal(form, meal.mealId)).then(resolveRequest)
			return
		}
		dispatch(createMeal(form)).then(resolveRequest)
	}
	const resolveRequest = success => {
		if (success) {
			closeMe()
		}
	}
	return (
		<form className="row">
			<div className="col-sm-6">
				<div className="mb-3">
					<TextField
						label="Name"
						value={form.name} 
						onChange={val => handleChange('name', val)} />
				</div>
				<div className="mb-3">
					<TextField
						label="Price"
						value={form.price}
						onChange={val => handleChange('price', val)} />
				</div>
				<div className="mb-3">
					<TextArea
						label="Description"
						value={form.description}
						onChange={val => handleChange('description', val)} />
				</div>
				<div className="mb-3">
					<TextArea
						label="Ingredients"
						value={form.ingredients}
						onChange={val => handleChange('ingredients', val)} />
				</div>
				<div className="mb-3">
					<TextField
						label="Weight"
						value={form.weight}
						onChange={val => handleChange('weight', val)} />
				</div>
			</div>
			<div className="col-sm-6">
				<div className="mb-3">
					<UploadField src={form.imgUrl} onChange={file => handleChange('imgUrl', file)} />
				</div>
			</div>
			<div className="col-sm-12 text-center">
				<BtnMain title="Save" onClick={save} />
			</div>
		</form>
	)
}

export default MealForm

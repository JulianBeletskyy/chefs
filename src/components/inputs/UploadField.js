import React, { useState } from 'react'
import './inputs.css'

const UploadField = ({onChange, src}) => {
	const [base64, setBase] = useState(null)
	const handleChange = ({target: {files}}) => {
		const [file] = files
		window.loadImage(
			file,
			(canvas, data) => {
				const base64 = canvas.toDataURL()
				setBase(base64)
				fetch(base64).then(async res => {
					const blob = await res.blob()
					const newFile = new window.File([blob], file.name, {type: file.type})
					onChange(newFile)
				})
			},
			{ orientation: true }
		)
	}
	return (
		<div className="upload">
			<input
				type="file"
				className="upload-input"
				onChange={handleChange} />
			<div className="empty-drop-zone">
				<span className="drop-zone-description">Drag 'n' drop image here, or click to select</span>
			</div>
			<div className="upload-preview" style={{backgroundImage: `url(${base64 || src})`}}></div>
		</div>
	)
}

export default UploadField
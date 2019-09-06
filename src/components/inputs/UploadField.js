import React, { useState } from 'react'
import './inputs.css'

const UploadField = ({onChange, src}) => {
	const [base64, setBase] = useState(null)
	const handleChange = ({target: {files}}) => {
		const [file] = files
		const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
        	setBase(reader.result)
        }
        onChange(file)
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
import uuidv4 from 'uuid/v4'
import path from 'path'
import fs from 'fs'

const upload = (file, dir, callback) => {
	dir = path.join(`static/uploads/${dir}`)
	const tempPath = file.path
	const targetPath = path.join(`${dir}/${uuidv4()}.${path.extname(file.originalname).slice(1)}`)
	if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir)
	}
	fs.renameSync(tempPath, targetPath)
	return targetPath.replace('static/uploads', 'image')
}

export default upload
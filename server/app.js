import express from 'express'
import bodyParser from 'body-parser'
import apiRoutes from './routes'
import cors from 'cors'
import socket from 'socket.io'
import http from 'http'
import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
// app.use(pino);

export let socketClient = null

app.use('/api/v1', apiRoutes)

const server = http.createServer(app)

app.listen(3001, () => {
	console.log('Express server is running on localhost:3001')
})

server.listen(6001, () => {
	console.log('Socket listen on localhost:6001')
})

const dir = path.join(__dirname, '../static')

const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
}

app.get('/image/*', (req, res, next) => {
	const file = path.join(dir, req.path.replace(/\/$/, '')).replace('image', 'uploads')
	if (file.indexOf(dir + path.sep) !== 0) {
        return res.status(403).end('Forbidden')
    }
	const type = mime[path.extname(file).slice(1)] || 'text/plain'
	const s = fs.createReadStream(file)
	s.on('open', () => {
        res.set('Content-Type', type)
        s.pipe(res)
    })
    s.on('error', () => {
        res.set('Content-Type', 'text/plain')
        res.status(404).end('Not found')
    })
})

app.use(express.static(path.join(__dirname, '../build')))

app.get('/*', async (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

export const io = socket.listen(server)

io.on('connection', socket => {
	// console.log('user connect')
	const token = socket.handshake.query.token
	const { id, role } = jwt.verify(token, process.env.SECRET)
	socket.join(id)
	socket.join(`${role}s`)
	// socketClient = socket
	socket.on('disconnect', () => {
		console.log('user disconnect')
	})
})

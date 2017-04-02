import express from 'express'
import socketIO from 'socket.io'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import scrypt from 'scrypt'
import config from './config'
import jwt from 'express-jwt'

const app = express()
const server = require('http').Server(app)
const io = socketIO(server)
const port = 8080

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(compression())
app.use(helmet())
app.use(jwt(config.jwt))
app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.send('It works!')
})

server.listen(port, () => {
    console.log(`> App is listening on ${port}.`)
})

io.on('connection', (socket) => {
    socket.on('do_something', (data) => {
        socket.broadcast.emit('do_something', data)
    })
})

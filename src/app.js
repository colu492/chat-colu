const express = require ('express')
const handlebars = require ('express-handlebars')
const { Server } = require ('socket.io')
const routerViews = require('./routes/views.router.js')

const app = express()
const httpServer = app.listen(8080, () => console.log('Server up'))
const io = new Server(httpServer)

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.static('./src/public'))
app.use('/', routerViews)

let messages = []

io.on('connection', socket => {
    // console.log(`Cliente ${socket.id} conectado`)
    socket.broadcast.emit('newUser')
    io.emit('logs', messages)
    socket.on('message', data => {
        messages.push(data)
        // console.log(messages)
        io.emit('logs', messages)
    })
})
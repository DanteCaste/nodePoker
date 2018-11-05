const express = require('express')
const app = express()

//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))

//routes
app.get('/', (req, res) => {
    res.render('index')
})

//Listen on port 3000
server = app.listen(3000)

//socket.io instantiation
const io = require("socket.io")(server)

let id = 0
let users = new Array
//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected')

    //default username
    socket.username = "Anonymus"
    user = {
        id: socket.id,
        username: socket.username,
        vote: ''
    }
    users.push(user)
    socket.emit('status', {users : users})
    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
        user = users.find(function(user) {
            return user.id === socket.id
        })
        users[users.indexOf(user)].username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username, id : socket.id})

    })

    //listen on new_vote
    socket.on('new_vote', (data) => {
        socket.vote = data.vote
        user = users.find(function(user) {
            return user.id === socket.id
        })
        users[users.indexOf(user)].vote = data.vote
        //broadcast the new vote
        io.sockets.emit('new_vote', {vote : socket.vote, username : socket.username})
        io.sockets.emit('status', {users : users} )
    })

    //listen on reveal
    socket.on('reveal', (data) => {
        io.sockets.emit('reveal')
    })

    //Disconnect
    socket.on("disconnect", (data) => {
        user = users.find(function(user) {
            return user.id === socket.id
        })
        const index = users.indexOf(user);
        if (index > -1) {
        users.splice(index, 1);
        }
    })
})
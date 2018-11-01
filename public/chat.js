$(function(){
    //make connection
    const socket = io.connect('http://localhost:3000')

    //buttons and inputs
    const message = $("#message")
    const username = $("#username")
    const send_message = $("#send_message")
    const send_username = $('#send_username')
    const chatroom = $("#chatroom")
    const cardOne = $(".card.one")
    const cardThree = $(".card.three")

    let users = Array()

    //Emit message
    send_message.click(function(){
        socket.emit('new_message', {message : message.val()})
    })
    
    //Emit votes
    cardOne.click(function(){
        socket.emit('new_vote', {vote : 1})
    })

    cardThree.click(function(){
        socket.emit('new_vote', {vote : 3})
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        console.log(data)
        chatroom.append("<p class='message'>" + data.username + " ID " + data.id +": " + data.message + "</p>")
    })

    //Listen on new_vote
    socket.on("new_vote", (data) => {
        console.log(data)
        chatroom.append("<p class='message'>" + data.username + ": " + data.vote + "</p>")
    })

    //Emit a username
    send_username.click(function(){
        console.log(username.val())
        socket.emit('change_username', {username : username.val()})
    })

    //Listen status
    socket.on("status", (users) => {
        console.log(users)
    })

    
});
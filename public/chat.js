$(function(){
    //make connection
    const socket = io.connect('http://localhost:3000')

    //buttons and inputs
    const message = $("#message")
    const username = $("#username")
    const send_message = $("#send_message")
    const send_username = $('#send_username')
    const chatroom = $("#chatroom")

    //Emit message
    send_message.click(function(){
        socket.emit('new_message', {message : message.val()})
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        console.log(data)
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //Emit a username
    send_username.click(function(){
        console.log(username.val())
        socket.emit('change_username', {username : username.val()})
    })

    
});
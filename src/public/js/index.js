let socket
let user = ''
let chatBox = document.getElementById('chatBox')

Swal.fire({
    title: 'Quien eres?',
    input: 'text',
    text: 'Elige un alias para el chat',
    inputValidator: value => !value.trim() && 'Escribe un alias',
    allowOutsideClick: false,
    inputPlaceholder: 'Alias'
}).then(result => {
    user = result.value
    console.log('user: ', user)
    socket = io()
    document.getElementById('userName').innerHTML = user

    chatBox.addEventListener('keyup', event => {
        if (event.key === "Enter") {
            if(chatBox.value.trim().length > 0) {
                socket.emit('message', {
                    user,
                    message: chatBox.value
                })
                chatBox.value = ''
            }
        }
    })
    
    socket.on('logs', data=> {
        const messagesLog = document.getElementById('messagesLog')
        let messages = ''
        data.reverse().forEach(message => {
            messages += `<p>[<i>${message.user}</i>]: ${message.message}</p>`
        });
        messagesLog.innerHTML = messages
    })
})


let socket = io();
function scrollToBottom(){
    let messages = document.querySelector('#messages').lastElementChild
    messages.scrollIntoView();
}
socket.on('connect', function(){
    let searchQuery = window.location.search.substring(1);
    let params = JSON.parse('{"' + decodeURI(searchQuery)
        .replace(/&/g, '","')
        .replace(/\+/g, ' ')
        .replace(/=/g,'":"') + '"}');
    console.log(params)
    socket.emit('join',params,(err)=>{
        if(err){
            alert(err)
            window.location.href = '/'
        }else {
            console.log('No error')
        }
    })
})
socket.on('updateUsersList',function (users) {
    let ol = document.createElement('ol')
    users.forEach((user)=>{
        let li = document.createElement('li')
        li.innerHTML = user;
        ol.appendChild(li)
    })
    let usersList = document.querySelector('#users')
    usersList.innerHTML = ''
    usersList.appendChild(ol)
})
socket.on('disconnect', function() {
    console.log('disconnected from server.');
});
socket.on('newMessage',(message)=>{
    const formattedTime = moment(message.createAt).format('LT');
    const template = document.querySelector('#message-template').innerHTML;
    const html = Mustache.render(template,{
        from: message.from,
        text: message.text,
        createAt: formattedTime
    });
    const div = document.createElement('div')
    div.innerHTML = html
    document.querySelector('#messages').appendChild(div)
    scrollToBottom()
    // const formattedTime = moment(message.createAt).format('LT');
    // console.log('newMessage',message)
    // let li = document.createElement('li')
    // li.innerText = `${message.from} ${formattedTime}:${message.text}`
    //
    // document.querySelector('#messages').appendChild(li)
})
socket.on('newLocationMessage',(message)=>{
    const formattedTime = moment(message.createAt).format('LT');
    const template = document.querySelector('#location-message-template').innerHTML;
    const html = Mustache.render(template,{
        from: message.from,
        url: message.url,
        createAt: formattedTime
    });
    const div = document.createElement('div')
    div.innerHTML = html
    document.querySelector('#messages').appendChild(div)
    scrollToBottom()
    // let li = document.createElement('li')
    // let a = document.createElement('a')
    // li.innerText = `${message.from} ${formattedTime}:`
    // a.setAttribute('target','_blank')
    // a.setAttribute('href',message.url)
    // a.innerHTML='My location'
    // li.appendChild(a)
    //
    // document.querySelector('#messages').appendChild(li)
})
socket.emit('createMessage',{
    from: 'Admin',
    text: 'Hey new user'
}, (message)=>{
    console.log('Server got it!', message)
})

document.querySelector('#submit-btn').addEventListener('click',(e)=>{
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text:document.querySelector('input[name="message"]').value
    },
        ()=>{

        })
})

document.querySelector('#send-location').addEventListener('click',
    (e)=>{
    if(!navigator.geolocation) {
        return alert('Geolocation is not support my ur browser ')
    }
        navigator.geolocation.getCurrentPosition((position)=>{
            socket.emit('createLocationMessage',{
                lat: position.coords.latitude,
                long: position.coords.longitude
            })
        },()=>{
            alert('Unable to fetch location')
        })
})

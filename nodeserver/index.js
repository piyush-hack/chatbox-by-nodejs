//node server for socket io


const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });//have to add this to use socket.io

const users = {}

io.on('connection', socket => {//handle all users, also connection is inbuilt emiites by socket server itself when a user connects
    socket.on('new-user-joined', name => {//handle one of many users
        console.log("new user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);//notify everyone in the connection other then me
        console.log('yes');
    });

    socket.on('send', message => {//send is not inbuilt
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
        console.log(users[socket.io]);
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('userleft', users[socket.id]);
        delete users[socket.id];
    })

    


})






const http = require("http")    
const socketIo = require('socket.io');      

const app=require('./app') 			
			  
const port = process.env.port || 3000    

const server = http.createServer(app) 

const messageRouter = require('./api/routes/message-routes')
const io = socketIo(server);


app.use('/messenger',messageRouter(io));
server.listen(port,(req,res)=>{
    console.log('listen on port 3000')
})	

io.on( 'connection', function( socket ) {
    console.log( 'a user has connected!' );
    });
 io.on("connection", (socket) => {
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
          users.push({
            userID: id,
            username: socket.username,
          });
        }
        socket.emit("users", users);
        console.log(users)
        socket.on("private message", ({ content, to }) => {
            socket.to(to).emit("private message", {
              content,
              from: socket.id,
            });
          });
      });



    io.on("connection", function (socket) {
        console.log("User connected", socket.id);
    });
    
    

    

    

    
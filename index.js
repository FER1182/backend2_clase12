//index.js siempre tiene que tener solo configuraciones
const express = require("express");
const productosRoutes = require("./api/productos");
const Contenedor = require("./api/contenedor");


const app = express();
const port = process.env.PORT || 8080

//midelwars de aplicacion
app.use(express.json())
app.use(express.urlencoded({extended:false}))//para decodificar la url .
//archivos estaticos
app.use(express.static(__dirname + "/public"));

app.set("view engine" ,"ejs")
app.set("views","./views")
app.use("/",productosRoutes);

//data
let msn = [];
let archivo = new Contenedor("text.json");
let data = archivo.getAll();

//para servidor en la nube



//server
const http = require("http");
const server = http.createServer(app);

//socket IO
const { Server, Socket } = require("socket.io");
const io = new Server(server);



//Conection Socket
    //el metodo on sirve para escuchar eventos


io.on("connection", (socket) => {
  console.log("un usuario se conecto");
  socket.emit("mensage_back",data); //sirve para emitir mensajes

   //escuchar eventos de mensajes
  socket.on("mensaje_cliente",(cliente)=>{
    console.log(cliente)
  }) 
    socket.on("dataMsn", (dataMsn) => {
    msn.push(dataMsn);
      socket.emit("mensage_chat",msn)
    //escuchar varios socket a la vez
    io.sockets.emit("mensage_chat",msn)

    });  
});

//Routes

//app.use("/api", router);



server.listen(port, () => {
  console.log("server oks");
});

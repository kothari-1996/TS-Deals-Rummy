import handler  from "../Handler/index";



function socket(io : any){

    // // Authentication
    // io.use(function(socket, next){
    //     if (socket.handshake.query.token){
    //       jwt.verify(socket.handshake.query.token, process.env.PRIVATE_KEY, function(err, decoded) {
    //         if (err) return next(new Error('Authentication error'));
    //         socket.decoded = decoded;
    //         next();
    //       });
    //     }
    //     else {
    //       next(new Error('Authentication error'));
    //     }    
    // })

    io.on("connection", (socket: any) => {

        console.log("==> user connection ::", socket.id);

        socket.on("request", (data: any) => {       
            handler(socket, data)
        })

        //disconnect
        socket.on("disconnect", () => {
        console.log("==>disconnect ::", socket.id);
        });
    }); 

}

export default { socketconnect : socket }
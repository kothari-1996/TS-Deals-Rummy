"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../Handler/index"));
function socket(io) {
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
    io.on("connection", (socket) => {
        console.log("==> user connection ::", socket.id);
        socket.on("request", (data) => {
            (0, index_1.default)(socket, data);
        });
        //disconnect
        socket.on("disconnect", () => {
            console.log("==>disconnect ::", socket.id);
        });
    });
}
exports.default = { socketconnect: socket };

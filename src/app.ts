import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });
const express =  require('express')
const app = express();
import commonConnect from "./connection/redis";
import socketconnect from "./connection/socket";
const http = require('http').createServer(app);
const io = require('socket.io')(http)

socketconnect.socketconnect(io)
commonConnect.redisconnect()

const port = process.env.PORT || 8080
http.listen(port, () => console.log(`listening PORT ==> ${port}`) )

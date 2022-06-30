"use strict";
// import { RedisClient, createClient } from 'redis';
// import { RedisCred } from '../interfaces/redis';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const golbal_1 = __importDefault(require("../constants/golbal"));
function connect() {
    const gamePlayConfig = {
        host: 'localhost',
        port: 6379
    };
    let redisClient = (0, redis_1.createClient)(gamePlayConfig);
    redisClient.on('ready', () => console.log('Redis Client success'));
    golbal_1.default.redisClient = redisClient;
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
}
exports.default = { redisconnect: connect };

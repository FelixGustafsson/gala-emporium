import express from 'express';
import mongoose from 'mongoose';
import apiRegister from './api-register.js';

const databaseURL =
  'mongodb+srv://damircoco16:Damirxxcoco123@cluster0.tmcj9oc.mongodb.net/galaemporium';

const server = express();
const port = 3000;

server.use(express.json());
server.use(express.static('../frontend'));
mongoose.connect(databaseURL);

apiRegister(server);

server.listen(port, () => {
  console.log('Server is listening');
});

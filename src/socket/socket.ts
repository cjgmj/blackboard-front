import openSocket, { Socket } from 'socket.io-client';
import { CanvasInfo } from '../models/canvas-info';

let socket: Socket;

const connectSocket = () => {
  socket = openSocket('http://localhost:3000');
  socket.on('connect', () => {
    console.log('Conectado al servidor');
  });
};

const drawMyBlackBoardInitialPoint = (canvasInfo: CanvasInfo) => {
  draw(canvasInfo, true);
};

const drawMyBlackBoard = (canvasInfo: CanvasInfo) => {
  draw(canvasInfo, false);
};

const draw = (canvasInfo: CanvasInfo, initialPoint: boolean) => {
  socket.emit('drawMyBlackBoard', canvasInfo, initialPoint);
};

export { connectSocket, drawMyBlackBoardInitialPoint, drawMyBlackBoard };

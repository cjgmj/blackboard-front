import openSocket, { Socket } from 'socket.io-client';
import { initialPoint, drawLine } from '../canvas/canvas';
import { CanvasInfo } from '../types/canvas-info';
import { id } from '../utils/canvas-properties';

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

const listenSocket = () => {
  listenDrawOnClient();
  disconnection();
};

const listenDrawOnClient = () => {
  socket.on(
    'drawOnClient',
    (canvasInfo: CanvasInfo, isInitialPoint: boolean) => {
      if (canvasInfo.id !== id) {
        const { x, y } = canvasInfo.lastPoint;

        // TODO Crear canvas o obtener el del id correspondiente
        if (isInitialPoint) {
          initialPoint(x, y);
        } else {
          drawLine(x, y, canvasInfo.color, canvasInfo.lineWidth);
        }
      }
    }
  );
};

const disconnection = () => {
  socket.on('disconnect', () => {
    console.log('Se perdió la conexión con el servidor');
  });
};

export {
  connectSocket,
  drawMyBlackBoardInitialPoint,
  drawMyBlackBoard,
  listenSocket,
};

import openSocket, { Socket } from 'socket.io-client';
import {
  initialPoint,
  drawLine,
  mapCoordenatesToCanvas,
} from '../canvas/canvas';
import { CanvasInfo } from '../types/canvas-info';
import { CanvasClient } from '../types/canvas-client';
import { id } from '../utils/canvas-properties';

let socket: Socket;

const connectAndListenSocket = () => {
  socket = openSocket('http://localhost:3000');
  socket.on('connect', () => {
    console.log('Conectado al servidor');

    listenSocket();
  });
};

const listenSocket = () => {
  drawSessionBlackboard();
  listenDrawOnClient();
  disconnection();
};

const drawSessionBlackboard = () => {
  socket.once('drawSessionBlackboard', (canvasList: CanvasClient[]) => {
    console.log(canvasList);
    canvasList.forEach((canvasClient) => {
      const { color, lineWidth, brushPaths } = canvasClient;

      brushPaths.forEach((brushPath) => {
        const { initialPoint: initPoint, points } = brushPath;

        initialPoint(initPoint.x, initPoint.y);

        points.forEach((point) => {
          drawLine(point.x, point.y, color, lineWidth);
        });
      });
    });
  });
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

const emitDrawMyBlackboardInitialPoint = (canvasInfo: CanvasInfo) => {
  emitDraw(canvasInfo, true);
};

const emitDrawMyBlackboard = (canvasInfo: CanvasInfo) => {
  emitDraw(canvasInfo, false);
};

const emitDraw = (canvasInfo: CanvasInfo, initialPoint: boolean) => {
  socket.emit('drawMyBlackboard', canvasInfo, initialPoint);
};

export {
  connectAndListenSocket,
  emitDrawMyBlackboardInitialPoint,
  emitDrawMyBlackboard,
};

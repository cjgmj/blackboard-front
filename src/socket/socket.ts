import openSocket, { Socket } from 'socket.io-client';

import { initialPoint, drawLine } from '../canvas/canvas';

import { id, canvasInfo } from '../utils/canvas-properties';

import { CanvasInfo } from '../types/canvas-info';
import { CanvasClient } from '../types/canvas-client';

let socket: Socket;

const connectAndListenSocket = () => {
  socket = openSocket('http://localhost:3000');

  socket.on('connect', () => {
    console.log('Conectado al servidor');

    onceDrawSessionBlackboard();
    onListenDrawOnClient();
    onDisconnect();
  });
};

const onceDrawSessionBlackboard = () => {
  socket.once('drawSessionBlackboard', (canvasList: CanvasClient[]) => {
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

const onListenDrawOnClient = () => {
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

const onDisconnect = () => {
  socket.on('disconnect', () => {
    console.log('Se perdió la conexión con el servidor');
  });
};

const emitDrawMyBlackboardInitialPoint = (x: number, y: number) => {
  emitDraw(x, y, true);
};

const emitDrawMyBlackboard = (x: number, y: number) => {
  emitDraw(x, y, false);
};

const emitDraw = (x: number, y: number, initialPoint: boolean) => {
  canvasInfo.lastPoint = { x, y };
  socket.emit('drawMyBlackboard', canvasInfo, initialPoint);
};

export {
  connectAndListenSocket,
  emitDrawMyBlackboardInitialPoint,
  emitDrawMyBlackboard,
};

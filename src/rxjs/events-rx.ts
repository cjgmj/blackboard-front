import { fromEvent, Observable } from 'rxjs';
import { takeUntil, distinctUntilKeyChanged, map } from 'rxjs/operators';

import { blackboard } from '../canvas/canvas';

import { MouseCoordenates } from '../types/mouse-coordenates';

const mousedown$ = fromEvent<MouseEvent>(blackboard, 'mousedown');
const mousemove$ = fromEvent<MouseEvent>(blackboard, 'mousemove');
const mouseup$ = fromEvent<MouseEvent>(blackboard, 'mouseup');

const obsmousemove$: Observable<MouseCoordenates> = mousemove$.pipe(
  map(({ x, y }) => ({ x, y, point: `${x}-${y}` })),
  distinctUntilKeyChanged('point'),
  takeUntil(mouseup$)
);

export { mousedown$, obsmousemove$ };

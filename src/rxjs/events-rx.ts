import { fromEvent, Observable } from 'rxjs';
import { takeUntil, distinctUntilKeyChanged, map } from 'rxjs/operators';

import { blackboard } from '../canvas/canvas';
import { MouseCoordenates } from '../models/mouse-coordenates';

const mousedown$: Observable<MouseEvent> = fromEvent<MouseEvent>(
  blackboard,
  'mousedown'
);
const mousemove$: Observable<MouseEvent> = fromEvent<MouseEvent>(
  blackboard,
  'mousemove'
);
const mouseup$: Observable<MouseEvent> = fromEvent<MouseEvent>(
  blackboard,
  'mouseup'
);

const obsmousemove$: Observable<MouseCoordenates> = mousemove$.pipe(
  map(({ x, y }) => ({ x, y, point: `${x}-${y}` } as MouseCoordenates)),
  distinctUntilKeyChanged('point'),
  takeUntil(mouseup$)
);

export { mousedown$, obsmousemove$ };

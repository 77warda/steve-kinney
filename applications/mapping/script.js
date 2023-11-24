import { of, from, interval, fromEvent, merge, NEVER } from 'rxjs';
import {
  pluck,
  concatMap,
  take,
  map,
  combineLatestAll,
  startWith,
  mergeMap,
  shareReplay,
  mapTo,
  tap,
  switchMap,
  share,
} from 'rxjs/operators';

import {
  getCharacter,
  render,
  startButton,
  pauseButton,
  setStatus,
} from './utilities';

const characters$ = interval(300).pipe(mergeMap(getCharacter));

const start$ = fromEvent(startButton, 'click').pipe(mapTo(true));
const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));

const isRunning$ = merge(start$, pause$).pipe(
  startWith(false),
  tap(setStatus),
  switchMap((isRunning) => (isRunning ? characters$ : NEVER)),
  pluck('name'),
  tap(render),
);

isRunning$.subscribe();

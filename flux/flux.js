import { Flummox } from 'flummox';
import ScreenActions from './screen-actions';
import ScreenStore from './screen-store';

import MessageActions from './message-actions';
import MessageStore from './message-store';

export default class Flux extends Flummox {
  constructor() {
    super();
    this.createActions('screen', ScreenActions);
    this.createStore('screen', ScreenStore, this);

    this.createActions('messages', MessageActions);
    this.createStore('messages', MessageStore, this);
  }
}
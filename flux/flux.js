import { Flummox } from 'flummox';
import ScreenActions from './screen-actions';
import ScreenStore from './screen-store';


export default class Flux extends Flummox {
  constructor() {
    super();
    this.createActions('screen', ScreenActions);
    this.createStore('screen', ScreenStore, this);
  }
}
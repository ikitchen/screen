import { Actions } from 'flummox';
import Screen from '../ds/screen';

export default class ScreenActions extends Actions {
  constructor() {
    super();
    this.screenDataSource = new Screen();
  }

  loadConfig() {
    return this.screenDataSource.getItem();
  }

  postAction(id) {
    return this.screenDataSource.postAction({id});
  }
}
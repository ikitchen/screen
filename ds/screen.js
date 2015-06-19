import DataSource from 'bivrost/data/source';
import Api from './api';


export default class ScreenDS extends DataSource {
  getItem(params) {
    return this.invokeMethod('getItem', params);
  }

  postAction(params) {
    return this.invokeMethod('postAction', params);
  }

  methodProperties() {
    return {
      api: {
        getItem: Api('GET /screen'),
        postAction: Api('POST /screen/action/:id'),
      },
    };
  }
}
import DataSource from 'bridge/data/source';
import HttpBin from './http-bin';


export default class DSTester extends DataSource {
  foo(params) {
    return this.resource.foo(params);
  }

  createResource() {
    return {
      api: {
        foo: HttpBin('POST /post')
      },
      serialize: {
        foo: function(req) {
          return req;
        }
      }
    };
  }
}

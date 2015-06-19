import {resolve}    from 'path';
import _            from 'lodash';
import DataSource   from 'bivrost/data/source';
import configParser from '../config-parser';
import ReadYaml     from './read-yaml';



export default class ScreenDataSource extends DataSource {
  get() {
    return this.invokeMethod('get');
  }

  getControlById(id) {
    return this.get()
      .then(screen => _(screen.controls).where({id}).value()[0])
  }

  methodProperties() {
    return {
      api: {
        get: ReadYaml(resolve(__dirname + '/../conf.yaml')),
      },
      process: {
        get: configParser,
      }
    }
  }
}
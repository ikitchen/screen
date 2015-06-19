import axios from 'axios';
import HttpAdapterAxios from 'bivrost/http/adapter/axios';
import Api from 'bivrost/http/api';

const ServerApi = Api.extend({
  base: '',
  prefix: '/api',
  adapter: HttpAdapterAxios(axios),
});

export default ServerApi;
import axios from 'axios';
import HttpAdapterAxios from 'bridge/http/adapter/axios';
import Api from 'bridge/http/api';

const HttpBin = Api.extend({
  base: 'http://httpbin.org',
  adapter: HttpAdapterAxios(axios),
});

export default HttpBin;

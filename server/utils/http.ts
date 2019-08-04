import axios from 'axios';
import config from '../config';

axios.defaults.baseURL = config.api;
axios.defaults.timeout = 3600000;
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.data.message) { console.log(error.response.data.message) }
});

export default axios;

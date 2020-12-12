import { functionsIn } from 'lodash';

const axios = (config) =>
  config.error
    ? Promise.reject({ error: config.error })
    : Promise.resolve({
        ...config,
        result: config.result,
      });

axios.interceptors = {
  request: [],
  response: [],
};

axios.prototype;

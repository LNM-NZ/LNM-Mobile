import axios from 'axios';
import {BASE_URL} from './urlUtil';
import Toast from './Toast';
import RootStore from '../mobx'

const request = axios.create({
    baseURL : BASE_URL
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
    Toast.showLoading("requesting...");
    console.log(config.headers);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    Toast.hideLoading();
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default {
    get: request.get,
    post: request.post,
    authorizedPost: (url, data={}, options={}) => {
      const token = RootStore.token;
      const headers = options.headers || {};
      return request.post(url, data, {
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers
        }
      })
    },
    authorizedGet: (url, data={}, options={}) => {
      const token = RootStore.token;
      const headers = options.headers || {};
      return request.get(url, {
        ...options,
        params: data,
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers
        }
      })
    },
}
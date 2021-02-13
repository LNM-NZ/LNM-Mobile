import axios from 'axios';
import {BASE_URL} from './urlUtil';
import Toast from './Toast';

const request = axios.create({
    baseURL : BASE_URL
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
    Toast.showLoading("requesting...");
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
    post: request.post
}
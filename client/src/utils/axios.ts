import axios from "axios";
import Cookies from 'js-cookie';

const customAxios = axios.create({
    baseURL: "http://localhost:3000",
    
});

customAxios.interceptors.request.use(function (config) {
    const jwtToken = Cookies.get('jwtToken');
    config.headers.Authorization = `Bearer ${jwtToken}`
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export default customAxios
import axios from 'axios';
import { baseUrl } from '../config';

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Accept-Version': 1,
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export default axiosClient;

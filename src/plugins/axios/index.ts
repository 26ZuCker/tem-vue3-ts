import axios from 'axios';
import config from './config';

const service = axios.create(config);

export default service;

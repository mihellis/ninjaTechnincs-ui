import axios from 'axios';

const instance = axios.create({
  baseURL: "https://localhost:7166/",
  withCredentials: true,
});

export default instance;
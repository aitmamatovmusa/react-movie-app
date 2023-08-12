import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY || ""
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""

const httpService = axios.create({
  baseURL: API_BASE_URL,
});

httpService.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params.apikey = API_KEY;
  return config;
});

export { httpService };
import axios from "axios";

const api = axios.create();

api.defaults.baseURL = process.env.REACT_APP_API_URL;

api.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

//All request will wait 2 seconds before timeout
api.defaults.timeout = 2000;
api.defaults.withCredentials = true;

export default api;

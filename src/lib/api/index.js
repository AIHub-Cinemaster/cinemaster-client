import axios from 'axios';

const host = process.env.REACT_APP_SERVER_URL;

export const apiClient = axios.create({
  baseURL: host,
});

apiClient.interceptors.response.use(
  function (response) {
    console.log("response success:", response);
    return response;
  },
  function (error) {
    console.log("response error:", error);
    return Promise.reject(error);
  }
);
const axios = require("axios");

/**
 * Axios Config
 */
const MAX_REQUESTS_COUNT = 5;
const INTERVAL_MS = 10;
let PENDING_REQUESTS = 0;

/**
 * Axios Instance
 */
const axiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.MIX_BEARER_TOKEN}`,
  },
});

/**
 * Axios Request Interceptor
 */
axiosInstance.interceptors.request.use(function (config) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
        PENDING_REQUESTS += 1;
        clearInterval(interval);
        resolve(config);
      }
    }, INTERVAL_MS);
  });
});

/**
 * Axios Response Interceptor
 */
axiosInstance.interceptors.response.use(
  function (response) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.resolve(response);
  },
  function (error) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.reject(error);
  }
);

const get = async (endpoint) => {
  const url = `${process.env.MIX_API_BASE}${endpoint}`;
  return axiosInstance.get(url).then((result) => result);
};

const post = async (endpoint, postData) => {
  const url = `${process.env.MIX_API_BASE}${endpoint}`;
  return axiosInstance.post(url, postData).then((result) => result);
};

export const api = { get, post };

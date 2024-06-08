import axios from "axios";
// import { ToastNotification } from "../Utils/ToastNotifications";


export const baseURL = "https://partyi.store/wp-json/wc/v3/"


export const instance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const makeRequest = async (type, path, body, options={}) => {
  // Add api_key and user_id, ip and then add body parameter
  body = {
    ...body,
  };
  const config = {
    timeout: 30000,  
    ...options,
  };
  
  const res = instance[type](path, body,config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error, "error");
      if (error.code === 401) {
        // ToastNotification("error", "Session expired. Please login again");
      }else if (error.code === 'ECONNABORTED' ) {
        // ToastNotification("error", "Request timed out");
      }
      return error;
    });
  return res;
};

instance.interceptors.request.use(
  (config) => {
    const username = "ck_3a23d88a3295dc44f0587aa0aaf9a932b78af9da";
    const password = "cs_51f79346476a84905ee795618f390d6619900ab0";
    config.auth = {
      username,
      password,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error?.response?.status === 401) {
      // window.location.reload(true);
      window.location.href = "/";
      window.localStorage.clear();
    }
    const code = error?.response && error?.response?.status;
    return Promise.reject({
      code,
    });
  }
);
// Trong file authApi.ts
import axios from "axios";
import queryString from "query-string";
import { appInfo } from "../contasts/appInfo";

const axiosClient = axios.create({
    baseURL: appInfo.BASE_URL,
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
    config.headers = {
        Authorization: '',
        Accept: 'application/json',
        ...config.headers,
    };

 
    return config;
});

axiosClient.interceptors.response.use(
    res => {
        return Promise.reject(res); 
    },
    error => {
        if (error.response) {
            const { response } = error;
            console.log(`\n\n\nError api 111 ${JSON.stringify(response.data)}`);
            return Promise.reject(response.data);
        } else {
            console.log(`\n\n\nError api 222 ${JSON.stringify(error)}`);
            return Promise.reject(error);
        }
    },
);

export default axiosClient;

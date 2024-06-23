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
        if (res.data && res.status === 200) {
            return res.data;
        }
        throw new Error('Error');
    },
    error => {
        console.log(`Error api ${JSON.stringify(error)}`);
        throw new Error(error.response);
    },
);

export default axiosClient;

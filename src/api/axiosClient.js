import { configure } from "@testing-library/react";
import axios from "axios";  
import queryString from "query-string";

import apiConfig from "./apiConfig";

const axiosClient = axios.create({
    baseURL : apiConfig.baseUrl,
    headers : {
        'Content-Type' : 'application/json'
    },
//    paramsSerializer : params => queryString.stringify({...params, api_key : apiConfig.apikey}),
    params: {
        api_key: '0e1e86d3e71f0243698b4816b4957a3f'
    },
});

axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((response) => {
    if (response && response.data){
        return response.data;
    }
    return response;
}, (error) => {
    throw error;
});


export default axiosClient;


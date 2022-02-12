import axios, { Axios } from "axios";

const axiosinstance = axios.create();

axiosinstance.defaults.baseURL = 'http://localhost:2400/api/v1'
axiosinstance.defaults.headers.common['authorization'] = localStorage.getItem('token')


axiosinstance.interceptors.response.use(
    function(respoce){
        console.log(respoce);

        return respoce;
    },

    function(error){
        console.log(error.response.status);

        if(error.response.status == 401){
            console.log('Unauthenticated');

            window.location.href = "/";
        }

        return Promise.reject(error);
    }
)

export default axiosinstance

import router from '@/router';
import axios from 'axios'
import { digestSM3 } from '@/utils/encrypto/sm3'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.baseURL = 'http://localhost:18080'; // 设置默认的API地址

// 请求拦截器，每次发送请求前运行
axios.interceptors.request.use(config => {
    // 检查请求的 URL 是否是登录接口
    if (config.url !== '/user/login') {
        const token = sessionStorage.getItem('token')
        if (token) {
            config.headers.token = token // 将token添加到请求头
        }
    }

    //如果请求的方法是 'get'，则添加查询参数
    let data = config.url
    if (config.method === 'get' && config.params) {
            data += '?'
            for (let key in config.params) {
                data += (key + "=" +  config.params[key]+ "&")
            }
            //删除多余的&
            data = data.slice(0, -1);
    } 
    if (config.method === 'post' && (typeof config.data) === 'object') {
         let dataString = JSON.stringify(config.data);
         console.log("dataString: "+ dataString)
         data += ('?' + dataString)
    } 
    let timestamp = Date.now()
    config.headers['timestamp'] = timestamp
    data += '$'
    config.headers['sign'] =  digestSM3(data + timestamp)
    return config;
}, error => {
    return Promise.reject(error);
});
// 响应拦截器，每次接收响应后运行
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        // 如果响应的状态码是 401，重定向到登录页面或者应用的根路径
    }
    return Promise.reject(error);
});

export default axios;
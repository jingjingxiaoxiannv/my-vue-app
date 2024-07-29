/*
 * @Author: zhoukai zk3366386@163.com
 * @Date: 2023-09-06 14:37:04
 * @LastEditors: zhoukai zk3366386@163.com
 * @LastEditTime: 2024-02-27 14:00:34
 * @FilePath: \h5shenpi\h5shenpi\vue3\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'


const request = axios.create({
 
    // baseURL: 'https://s.cd1a.cn/public/index.php/operation', //测试
    // baseURL: 'https://zhongtai.tiantianchuxing.cn/', //正式
    baseURL :'https://adminapi.cd1a.cn/public/index.php/', //测式

    // baseURL: '', //测试
    withCredentials: false,
    timeout: 30000
})
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json; charset=utf-8;'
    return config;
}, error => {
    return Promise.reject(error);
});
request.interceptors.response.use(response => {
    if (response.status >= 400) {
        // 处理其他异常状态
        alert('请求失败，请重试。');
        return Promise.reject(response);
    }
    return response;
}, error => {
    return Promise.reject(error);
});

export default request
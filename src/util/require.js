import axios from "axios";
import JSEncrypt from "jsencrypt";
import { Message } from "element-ui";

const http = axios.create({
    baseURL: 'http://111.230.17.116:3001/',
    timeout: 10000,
});

const EncryptMap = {
    "/admin/login": "/admin/login",
    "/admin/register": "/admin/register",
}

http.interceptors.request.use(async (config) => {

    if (config.url === EncryptMap[config.url]) {
        let key = sessionStorage.getItem("pubKey")
        let encrypt = new JSEncrypt()
        encrypt.setPublicKey(key)
        config.data["password"] = encrypt.encrypt(config.data["password"])
    }
    let token = sessionStorage.getItem("token")
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }


    return config
}, err => {
    Message.error(err)
    return Promise.reject(err)
})


http.interceptors.response.use(res => {
    let result = res.data
    if (result.data?.token) {
        let token = result.data.token.token
        let uid = result.data.userId
        let nickname = result.data.nickname

        sessionStorage.setItem("uid", uid)
        sessionStorage.setItem("token", token)
        sessionStorage.setItem("nickname", nickname)
    }
    return result.data ? result.data : result;
}, err => {
    return Promise.reject(err)
})
export default http
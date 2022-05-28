import { API_PATH_NAME } from "../constants/apiPath"
const axios = require('axios');

export default async function register(username,password,rePassword){
    try {
        let response = await axios({
            method: 'post',
            url: `${API_PATH_NAME}/auth/token/login/`,
            data: {
                username : username,
                password : password,
                re_password : rePassword
            },
            headers: {
                'Content-Type': "multipart/form-data"
            }
        });
        return response;
    } catch (err) {
        throw new Error(err)
    }
}
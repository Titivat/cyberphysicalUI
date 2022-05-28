import { API_PATH_NAME } from "../constants/apiPath"
const axios = require('axios');

export default async function login(username,password){
    try {
        let token = localStorage.getItem("authToken")
        let response = await axios({
            method: 'post',
            url: `${API_PATH_NAME}/auth/token/logout/`,
            headers: {
                'Content-Type': "multipart/form-data",
                'Authorization' : `Token ${token}`
            }
        });
        return response;
    } catch (err) {
        throw new Error(err)
    }
}
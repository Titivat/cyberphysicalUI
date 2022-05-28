import { API_PATH_NAME } from "../constants/apiPath"
const axios = require('axios');

export default async function login(username,password){
    try {
        let response = await axios({
            method: 'post',
            url: `${API_PATH_NAME}auth/token/login/`,
            data: {
                username : username,
                password : password,
            },
            headers: {
                'Content-Type': "multipart/form-data",
            }
        });
        if (response.status == 200){
            // alert("logged in")
            localStorage.setItem("authToken",response.data.auth_token)
            return response
        }
        else throw new Error(response.data)
    } catch (err) {
        throw new Error(err.message)
    }
}
import { API_PATH_NAME } from "../constants/apiPath"
const axios = require('axios');

export default async function userDetail(token){
    try {
        let response = await axios({
            method: 'get',
            url: `${API_PATH_NAME}auth/users/me/`,
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
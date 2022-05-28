import { API_PATH_NAME } from "../constants/apiPath"
const axios = require('axios');

export default async function postApi( path, data = null, token = null ){
    try {
        let header = {
            'Content-Type': "multipart/form-data"
        }
        if (token != null) header.Authorization = `Token ${token}`

        let response = await axios({
            method: 'post',
            url: `${API_PATH_NAME}${path}`,
            data: data,
            headers: header
        });
        return response;
    } catch (err) {
        throw new Error(err)
    }
}
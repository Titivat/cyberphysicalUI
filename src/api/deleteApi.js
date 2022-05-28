import { API_PATH_NAME } from "../constants/apiPath"
const axios = require('axios');

export default function deleteApi(path,data, token = null) {
    try {
        let header = {
            'Content-Type': "multipart/form-data"
        }
        if (token != null) header.Authorization = `Token ${token}`

        let response = axios({
            method: 'delete',
            url: `${API_PATH_NAME}${path}`,
            headers: header,
            data: data,
        });
        return response;
    } catch (err) {
        throw new Error(err)
    }
}
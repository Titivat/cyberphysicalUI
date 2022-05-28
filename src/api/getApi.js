import { API_PATH_NAME } from "../constants/apiPath"
const axios = require('axios');

export default function  getApi(path, token = null) {
    try {
        let thead = token ? {'Authorization': `Token ${token}`} : {}
        let response = axios({
            method: 'get',
            url: `${API_PATH_NAME}${path}`,
            headers: thead
        });
        return response;
    } catch (err) {
        throw new Error(err)
    }
}
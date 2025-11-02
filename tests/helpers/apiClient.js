const axios = require ('axios')

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
});

module.exports = apiClient;

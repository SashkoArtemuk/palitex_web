import axios from 'axios';

const API_URL = 'http://localhost:5200/api/v1';

const instance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export function setToken(token) {
    localStorage.setItem('auth_bearer', token);

    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function removeToken() {
    localStorage.removeItem('auth_bearer');

    delete instance.defaults.headers.common.Authorization;
}

export default instance;

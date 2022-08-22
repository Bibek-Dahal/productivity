import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

const baseURL = 'http://127.0.0.1:8000';

let instance = axios.create({
    baseURL
})

instance.interceptors.request.use(async req => {
    console.log('Interceptor ran');
    const token = localStorage.getItem("token") ? 
                localStorage.getItem("token"):
                null;
    console.log('token = ',token);
    const user = jwt_decode(token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log('isExpired : ',isExpired);

    req.headers.Authorization = `Bearer ${token}`

    if(!isExpired) return req;

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return req;
})

export default instance;
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-6a3f4.firebaseio.com/'
});

export default instance;
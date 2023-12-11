import axios from 'axios';

const urlApi = import.meta.env.VITE_API_URL;

const request = axios.create({
    baseURL: urlApi,
});

const get = async (url: any, params: any) => {
    const res = await request.get(url, params);
    return res.data;
};

export default request;
export { request, get };

import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL, headers: {
        'Content-Type': 'application/json',
    },
});

export const brandService = {
    getAll: () => api.get('/brands/getAll'),

    getById: (id) => api.get(`/brands/get/${id}`),

    create: (brandData) => api.post('/brands/add', brandData),

    update: (brandData) => api.post(`/brands/update`, brandData),

    delete: (id) => api.post(`/brands/delete/${id}`),
};

export const modelService = {
    getAll: () => api.get('/models/getAll'),

    getById: (id) => api.get(`/models/get/${id}`),

    create: (modelData) => api.post('/models/add', modelData),

    update: (modelData) => api.post(`/models/update`, modelData),

    delete: (id) => api.post(`/models/delete/${id}`),
};
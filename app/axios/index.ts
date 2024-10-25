import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';

const localIp = '192.168.1.249';
// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: __DEV__ ? `http://${localIp}:3000` : '', // Replace with your API base URL
    timeout: 10000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Add any custom logic before the request is sent
        // For example, add authorization token
        const token = await SecureStore.getItemAsync('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    (error: AxiosError) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Handle response error
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error('Response error:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
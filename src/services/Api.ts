import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipInterceptor?: boolean;
}

// Cria uma instância do Axios
const api = axios.create({
  baseURL: 'http://62.72.9.154:5121/api/',
});

// Interceptor de requisição para adicionar o token ao header
api.interceptors.request.use(
  async (config: any) => {
    if (config.skipInterceptor) {
      return config;
    }
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers['Authorization'] = `Bearer ${parsedToken.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta para lidar com erros 401 e atualizar o token
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const storedToken = await AsyncStorage.getItem('userToken');
      if (storedToken) {
        const { refreshToken, token } = JSON.parse(storedToken);

        // Tentativa de atualizar o token
        try {
          const res = await axios.post('Authentication/TokenRefresh', {
            accessToken: token,
            refreshToken: refreshToken,
          });

          if (res.status === 200) {
            await AsyncStorage.setItem('userToken', JSON.stringify(res.data));

            // Altera o token no header e refaz a requisição original
            originalRequest.headers['Authorization'] = `Bearer ${res.data.token}`;
            return api(originalRequest);
          }
        } catch (ex) {
          return Promise.reject(ex);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/api",
});

// Interceptor de requisição: adiciona o access token a cada requisição
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta: trata erros de autorização e tenta renovar o token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      try {
        const { data } = await axios.post(
          "http://localhost:8081/api/refresh",
          { refreshToken }
        );
        // Atualiza o access token no localStorage
        localStorage.setItem("access_token", data.access_token);
        // Atualiza o cabeçalho da requisição original
        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        // Retorna a nova requisição
        return axios(originalRequest);
      } catch (err) {
        // Se a renovação falhar, redireciona para login
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default API;

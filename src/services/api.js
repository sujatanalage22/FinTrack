import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // JSON Server backend
});

export default api;

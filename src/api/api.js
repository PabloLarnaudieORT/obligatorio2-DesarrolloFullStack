import axios from "axios";

const api = axios.create({
  baseURL: "https://obligatorio1-dfs-seven.vercel.app/v1",
});

export default api;
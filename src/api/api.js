import axios from "axios";

const api = axios.create({
  baseURL: "https://obligatorio1-dfs-seven.vercel.app/",
});

export default api;
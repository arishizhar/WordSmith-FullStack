import axios from "axios";

const API = axios.create({ baseURL: "/api" });

export const fetchPosts = async () => {
  const response = await API.get("/posts");
  return response.data;
};

import axios, { CanceledError } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3500",
  headers: {},
});

export default apiClient;
export { CanceledError };

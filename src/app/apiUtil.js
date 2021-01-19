import axios from "axios";

console.log("base url for machine", process.env.BASE_URL);
let endpoint = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:3000",
  withCredentials: true
});

export default endpoint;

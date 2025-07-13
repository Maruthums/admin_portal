import axios from "axios";
let baseURL = process.env.REACT_APP_BASE_URL;

const headers: any = {
  "Content-type": "application/json"
};

const instance = axios.create({
  baseURL,
  headers
});

export default instance;

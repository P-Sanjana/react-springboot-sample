import axios from "axios";

export default axios.create({
  baseURL: `http://localhost:3004/`,
});

export const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

import axios from "axios";
const baseDomein = "http://localhost:3000";
export default axios.create({
    baseURL: baseDomein,
    withCredentials: true,
});
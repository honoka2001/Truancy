import Repository from "./Repository";
const resource = "/definitions";
export default {
    get() {
        return Repository.get(`${resource}`);
    },
    post(payload) {
        return Repository.post(`${resource}`, payload);
    },
};
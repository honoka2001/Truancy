import Repository from "./Repository";
const resource = "/users";
export default {
    get() {
        return Repository.get(`${resource}`);
    },
    post(payload) {
        return Repository.post(`${resource}`, payload);
    },
};
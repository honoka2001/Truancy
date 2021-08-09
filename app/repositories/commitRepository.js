import Repository from "./Repository";
const resource = "/commits";
export default {
    get() {
        return Repository.get(`${resource}`);
    },
    post(payload) {
        return Repository.post(`${resource}`, payload);
    },
};
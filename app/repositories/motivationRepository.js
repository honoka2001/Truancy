import Repository from "./Repository";
const resource = "/motivations";
export default {
    showGet(id) {
        return Repository.get(`${resource}/${id}`);
    },
};
import UserRepository from "./userRepository";

const repositories = {
    users: UserRepository,
};

export const RepositoryFactory = {
    get: (name) => repositories[name],
};
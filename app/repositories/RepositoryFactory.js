import UserRepository from "./userRepository";
import CommitRepository from "./commitRepository";
import MotivationRepository from "./motivationRepository";

const repositories = {
    users: UserRepository,
    commits: CommitRepository,
    motivations: MotivationRepository,
};

export const RepositoryFactory = {
    get: (name) => repositories[name],
};
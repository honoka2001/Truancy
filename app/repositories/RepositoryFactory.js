import UserRepository from "./userRepository";
import CommitRepository from "./commitRepository";

const repositories = {
    users: UserRepository,
    commits: CommitRepository,
    definition: DefinitionRepository,
};

export const RepositoryFactory = {
    get: (name) => repositories[name],
};
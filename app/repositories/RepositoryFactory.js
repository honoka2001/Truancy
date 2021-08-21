import UserRepository from "./userRepository";
import CommitRepository from "./commitRepository";
import DefinitionRepository from "./definitionRepository";

const repositories = {
    users: UserRepository,
    commits: CommitRepository,
    definitions: DefinitionRepository,
};

export const RepositoryFactory = {
    get: (name) => repositories[name],
};
import UserRepository from "./userRepository";
import CommitRepository from "./commitRepository";
import DefinitionRepository from "./definitionRepository";
import MotivationRepository from "./motivationRepository";

const repositories = {
    users: UserRepository,
    commits: CommitRepository,
    definitions: DefinitionRepository,
    motivations: MotivationRepository,
};

export const RepositoryFactory = {
    get: (name) => repositories[name],
};
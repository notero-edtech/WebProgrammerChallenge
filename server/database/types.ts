import { EntityTarget, ObjectLiteral, Repository } from "typeorm"

export interface RepositoryProvider {
    getRepository<T extends ObjectLiteral>(entities: EntityTarget<T>): Repository<T>
}

import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import DBConnectionManagerTypeORM from "../../../../utils/database/DBConnectionManagerORM";
import IDBConnectionManager from "../../../../utils/database/IDBConnectionManager";
import Repository from "../../../commons/domain/repository/Repository";
import User from "../entity/User";
import { CustomError } from "../../../../erros/CustomError";

export default class UserUpdateRepository implements Repository<User, User>
{

    private iDBConnectionManager: IDBConnectionManager;

    constructor(

    ) {
        this.iDBConnectionManager = DBConnectionManagerTypeORM.getInstance();
    }

    async execute(port?: User): Promise<User> {
        const connection = await this.iDBConnectionManager.getActiveConnection();

        const result = await connection.manager
            .createQueryBuilder(User, 'entity')
            .update(User)
            .set(port as QueryDeepPartialEntity<User>)
            .where(`id = :id`, { id: port.id })
            .updateEntity(false)
            .execute();
        if (result.affected === 0) throw new CustomError("Not Found", 404);

        const updatedEntity = await connection.manager.createQueryBuilder(User, "entity")
            .where(`id = :id`, { id: port.id })
            .getOne();

        return updatedEntity;

    }

}
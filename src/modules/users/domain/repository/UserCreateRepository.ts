import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import DBConnectionManagerTypeORM from "../../../../utils/database/DBConnectionManagerORM";
import IDBConnectionManager from "../../../../utils/database/IDBConnectionManager";
import Repository from "../../../commons/domain/repository/Repository";
import User from "../entity/User";

export default class UserCreateRepository implements Repository<User, User>
{

    private iDBConnectionManager: IDBConnectionManager;

    constructor(

    ) {
        this.iDBConnectionManager = DBConnectionManagerTypeORM.getInstance();
    }

    async execute(port?: User): Promise<User> {
        const connection = await this.iDBConnectionManager.getActiveConnection();

        await connection.manager
            .createQueryBuilder()
            .insert()
            .into(User)
            .values(port as QueryDeepPartialEntity<User>)
            .updateEntity(true) // Same workound as previously mentioned
            .execute();


        return port;
    }

}
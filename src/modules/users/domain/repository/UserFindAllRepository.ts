import DBConnectionManagerTypeORM from "../../../../utils/database/DBConnectionManagerORM";
import IDBConnectionManager from "../../../../utils/database/IDBConnectionManager";
import Repository from "../../../commons/domain/repository/Repository";
import User from "../entity/User";

export default class UserFindAllRepository implements Repository<void, User[]>
{

    private iDBConnectionManager: IDBConnectionManager;

    constructor(

    ) {
        this.iDBConnectionManager = DBConnectionManagerTypeORM.getInstance();
    }

    async execute(): Promise<User[]> {
        const connection = await this.iDBConnectionManager.getActiveConnection();

        const queryBuilder = connection.manager
            .getRepository(User)
            .createQueryBuilder("User");

        const result = await queryBuilder.getMany();

        return result;
    }

}
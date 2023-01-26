import DBConnectionManagerTypeORM from "../../../../utils/database/DBConnectionManagerORM";
import IDBConnectionManager from "../../../../utils/database/IDBConnectionManager";
import Repository from "../../../commons/domain/repository/Repository";
import User from "../entity/User";

export default class UserFindByIdRepository implements Repository<number, User>
{

    private iDBConnectionManager: IDBConnectionManager;

    constructor(

    ) {
        this.iDBConnectionManager = DBConnectionManagerTypeORM.getInstance();
    }

    async execute(port?: number): Promise<User> {
        const connection = await this.iDBConnectionManager.getActiveConnection();

        const queryBuilder = connection.manager
        .getRepository(User)
        .createQueryBuilder("User")
        .where("User.id = :id", {
            id: port
        });

        const result = await queryBuilder.getOne();

        return result;
    }

}
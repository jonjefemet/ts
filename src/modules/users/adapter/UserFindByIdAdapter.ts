import DBConnectionManagerTypeORM from "../../../utils/database/DBConnectionManagerORM";
import IDBConnectionManager from "../../../utils/database/IDBConnectionManager";
import Adapter from "../../commons/adapter/Adapter";
import Repository from "../../commons/domain/repository/Repository";
import User from "../domain/entity/User";
import UserFindByIdRepository from "../domain/repository/UserFindByIdRepository";

export default class UserFindByIdAdapter implements Adapter<number, User> {

    private iDBConnectionManager: IDBConnectionManager;
    private userFindByIdRepository: Repository<number, User>;

    constructor(

    ) {
        this.iDBConnectionManager = DBConnectionManagerTypeORM.getInstance();
        this.userFindByIdRepository = new UserFindByIdRepository();
    }

    async execute(port?: number): Promise<User> {

        await this.iDBConnectionManager.getConnection();

        try {

            return await this.userFindByIdRepository.execute(port);

        } catch (error) {
            console.log("🚀 ~ file: UserFindByIdAdapter.ts:23 ~ UserFindByIdAdapter ~ execute ~ error", error)
            throw error;

        } finally {
            await this.iDBConnectionManager.disconnect();
        }
    }

}
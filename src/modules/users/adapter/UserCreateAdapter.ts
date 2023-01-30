import DBConnectionManagerTypeORM from "../../../utils/database/DBConnectionManagerORM";
import IDBConnectionManager from "../../../utils/database/IDBConnectionManager";
import Adapter from "../../commons/adapter/Adapter";
import Repository from "../../commons/domain/repository/Repository";
import User from "../domain/entity/User";
import UserCreateRepository from "../domain/repository/UserCreateRepository";

export default class UserCreateAdapter implements Adapter<User, User> {

    private iDBConnectionManager: IDBConnectionManager;
    private userCreateRepository: Repository<User, User>;

    constructor(

    ) {
        this.iDBConnectionManager = DBConnectionManagerTypeORM.getInstance();
        this.userCreateRepository = new UserCreateRepository();
    }

    async execute(port?: User): Promise<User> {

        await this.iDBConnectionManager.getConnection();

        try {

            return await this.userCreateRepository.execute(port);

        } catch (error) {
            console.log("🚀 ~ file: UserCreateAdapter.ts:29 ~ UserCreateAdapter ~ execute ~ error", error)
            throw error;

        } finally {
            await this.iDBConnectionManager.disconnect();
        }
    }

}
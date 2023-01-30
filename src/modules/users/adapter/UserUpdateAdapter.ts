import DBConnectionManagerTypeORM from "../../../utils/database/DBConnectionManagerORM";
import IDBConnectionManager from "../../../utils/database/IDBConnectionManager";
import Adapter from "../../commons/adapter/Adapter";
import Repository from "../../commons/domain/repository/Repository";
import User from "../domain/entity/User";
import UserUpdateRepository from "../domain/repository/UserUpdateRepository";

export default class UserUpdateAdapter implements Adapter<User, User> {

    private iDBConnectionManager: IDBConnectionManager;
    private userUpdateRepository: Repository<User, User>;

    constructor(

    ) {
        this.iDBConnectionManager = DBConnectionManagerTypeORM.getInstance();
        this.userUpdateRepository = new UserUpdateRepository();
    }

    async execute(port?: User): Promise<User> {

        await this.iDBConnectionManager.getConnection();

        try {

            return await this.userUpdateRepository.execute(port);

        } catch (error) {
            console.log("🚀 ~ file: UserCreateAdapter.ts:29 ~ UserCreateAdapter ~ execute ~ error", error)
            throw error;

        } finally {
            await this.iDBConnectionManager.disconnect();
        }
    }

}
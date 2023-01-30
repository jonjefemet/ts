import DBConnectionManagerTypeORM from "../../../utils/database/DBConnectionManagerORM";
import IDBConnectionManager from "../../../utils/database/IDBConnectionManager";
import Adapter from "../../commons/adapter/Adapter";
import Repository from "../../commons/domain/repository/Repository";
import User from "../domain/entity/User";
import UserFindAllRepository from "../domain/repository/UserFindAllRepository";

export default class UserFindAllAdapter implements Adapter<void, User[]> {

    private iDBConnectionManager: IDBConnectionManager;
    private userFindAllRepository: Repository<void, User[]>;

    constructor(

    ) {
        this.iDBConnectionManager = DBConnectionManagerTypeORM.getInstance();
        this.userFindAllRepository = new UserFindAllRepository();
    }

    async execute(): Promise<User[]> {

        await this.iDBConnectionManager.getConnection();

        try {

            return await this.userFindAllRepository.execute();

        } catch (error) {
            console.log("🚀 ~ file: UserFindAllAdapter.ts:29 ~ UserFindAllAdapter ~ execute ~ error", error)
            throw error;
        } finally {
            await this.iDBConnectionManager.disconnect();
        }
    }

}
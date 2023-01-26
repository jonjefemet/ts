import { DataSource, QueryRunner } from "typeorm";

import DBConnectionHelper from "../helpers/DBConnectionHelper";
import IDBConnectionManager from "./IDBConnectionManager";
export default class DBConnectionManagerTypeORM implements IDBConnectionManager {

    private static instance: DBConnectionManagerTypeORM;
    private queryRunner: QueryRunner;
    private connection: DataSource;
    private secrets: any;

    private constructor() { }


    public static getInstance(): DBConnectionManagerTypeORM {
        if (!DBConnectionManagerTypeORM.instance) {
            DBConnectionManagerTypeORM.instance = new DBConnectionManagerTypeORM();
        }
        return DBConnectionManagerTypeORM.instance;
    }

    public async connect(): Promise<DataSource> {

        try {
            this.secrets = {
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                dbname: process.env.DB_NAME,
            };


            if (!this.connection) {
                this.connection = await new DBConnectionHelper().connect(this.secrets);
            } else if (!this.connection.isInitialized) {
                await this.connection.initialize();
            }
            return this.connection;
        } catch (error) {
            console.log("🚀 ~ file: DBConnectionManagerORM.ts:30 ~ DBConnectionManagerTypeORM ~ connect ~ error", error)

            throw error;
        }
    }

    private async beginTransaction(): Promise<QueryRunner> {
        try {
            await this.connect();

            if (!this.queryRunner || this.queryRunner.isReleased) {
                this.queryRunner = this.connection.createQueryRunner();
                await this.queryRunner.startTransaction();
            }

            return this.queryRunner;
        } catch (error) {
            console.log("🚀 ~ file: DBConnectionManagerORM.ts:47 ~ DBConnectionManagerTypeORM ~ beginTransaction ~ error", error)

            throw new error;
        }
    }

    async getConnection(): Promise<DataSource> {
        return this.connection && this.connection.isInitialized ? this.connection : this.connect();
    }

    async getTransaction(): Promise<QueryRunner> {
        return this.queryRunner && !this.queryRunner.isReleased ? this.queryRunner : this.beginTransaction();
    }

    async getActiveConnection(): Promise<DataSource | QueryRunner> {
        return this.queryRunner && this.queryRunner.isTransactionActive ? this.getTransaction() : this.getConnection();
    }

    async endTransaction(): Promise<void> {
        try {
            await this.queryRunner?.release();
        } catch (error) {
            console.log("🚀 ~ file: DBConnectionManagerORM.ts:70 ~ DBConnectionManagerTypeORM ~ endTransaction ~ error", error)
            throw new error;
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.connection?.destroy();
        } catch (error) {
            console.log("🚀 ~ file: DBConnectionManagerORM.ts:78 ~ DBConnectionManagerTypeORM ~ disconnect ~ error", error)
            throw new error;
        }
    }
}
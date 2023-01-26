import { DataSource, QueryRunner } from "typeorm";
import DBConnectionManagerTypeORM from "./DBConnectionManagerORM";

export default interface IDBConnectionManager {
    connect(): Promise<DataSource>;
    disconnect(): Promise<void>;
    endTransaction(): Promise<void>;
    getTransaction(): Promise<QueryRunner>;
    getActiveConnection(): Promise<DataSource | QueryRunner>;
    getConnection(): Promise<DataSource>;
}
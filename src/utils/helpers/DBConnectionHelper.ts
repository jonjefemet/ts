import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DataSource } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"
import User from "../../modules/users/domain/entity/User";

export default class DBConnectionHelper {
	async connect(url: any): Promise<DataSource> {
		const { dbname, port, password, host, username } = url;
		const dataSourceOptions: MysqlConnectionOptions = {
			type: "mysql",
			host,
			username,
			password,
			database: dbname,
			port,
			namingStrategy: new SnakeNamingStrategy(),
			entities: [
				User
			],
			logging: true,
			synchronize: true
		};
		return await new DataSource(dataSourceOptions).initialize();
	}
}

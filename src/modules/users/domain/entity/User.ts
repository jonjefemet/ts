import { Column, Entity } from "typeorm";
import DefaultEntity from "../../../commons/domain/entity/DefaultEntity";

@Entity({ name: "users" })
export default class User extends DefaultEntity {

    @Column({ name: "name", type: "varchar" })
    name: string;

    @Column({ name: "age", type: "int" })
    age: number;
    
}
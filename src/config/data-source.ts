import "reflect-metadata"
import {DataSource} from "typeorm"
import {User} from "../entities/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "131415Sah1ncann..",
    database: "bbackerei_backend",
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: [],
    subscribers: [],
})


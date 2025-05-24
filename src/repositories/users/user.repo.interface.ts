import {User} from "../../entities/User";

export interface IUserRepository {
    findByName(name: string): Promise<User| null>;
}

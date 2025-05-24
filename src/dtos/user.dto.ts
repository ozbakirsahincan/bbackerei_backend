import { IUserResponse, ICreateUserRequest, IUpdateUserRequest } from '../interfaces/IUser';
import { User } from '../entities/User';

export class UserDTO {
    static toResponse(user: User): IUserResponse {
        return {
            id: user.id,
            name: user.firstName,
            address: user.address
        };
    }

    static toResponseList(users: User[]): IUserResponse[] {
        return users.map(user => this.toResponse(user));
    }

    static toEntity(dto: ICreateUserRequest): User {
        const user = new User();
        user.firstName = dto.name;
        user.address = dto.address || '';
        return user;
    }

    static toUpdateEntity(entity: User, dto: IUpdateUserRequest): User {
        if (dto.name) entity.firstName = dto.name;
        if (dto.address) entity.address = dto.address;
        return entity;
    }
}

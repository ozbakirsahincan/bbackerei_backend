export interface IUser {
    id?: number;
    name: string;
    address?: string;
}

export interface IUserResponse extends IUser {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICreateUserRequest {
    name: string;
    age: number;
    address?: string;
}

export interface IUpdateUserRequest {
    name?: string;
    age?: number;
    address?: string;
}

import { Request, Response } from 'express';
import { getUserRepository } from '../config/database.init';
import { NotFoundError, ValidationError } from '../middlewares/errors/error.types';
import { ICreateUserRequest, IUpdateUserRequest } from '../interfaces/IUser';
import { UserDTO } from '../dtos/user.dto';

export class UserController {
    /**
     * Tüm kullanıcıları getirir
     */
    static async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await getUserRepository().find();
        res.json(UserDTO.toResponseList(users));
    }

    /**
     * ID'ye göre kullanıcı getirir
     */
    static async getUserById(req: Request, res: Response): Promise<void> {
        const id = req.params["id"];
        const user = await getUserRepository().findOne({ where: { id: parseInt(id) } });

        if (!user) {
            throw new NotFoundError("Kullanıcı bulunamadı");
        }

        res.json(UserDTO.toResponse(user));
    }

    /**
     * Yeni kullanıcı oluşturur
     */
    static async createUser(req: Request<{}, {}, ICreateUserRequest>, res: Response): Promise<void> {
        const createUserRequest = req.body;

        // Giriş doğrulama
        if (!createUserRequest.name || !createUserRequest.age) {
            throw new ValidationError("İsim ve yaş alanları zorunludur");
        }

        // DTO'dan entities'e dönüşüm
        const user = UserDTO.toEntity(createUserRequest);

        // Kaydet ve response'a dönüştür
        const savedUser = await getUserRepository().save(user);
        res.status(201).json(UserDTO.toResponse(savedUser));
    }

    /**
     * Kullanıcı bilgilerini günceller
     */
    static async updateUser(req: Request<{id: string}, {}, IUpdateUserRequest>, res: Response): Promise<void> {
        const id = req.params.id;
        const updateUserRequest = req.body;

        const user = await getUserRepository().findOne({ where: { id: parseInt(id) } });

        if (!user) {
            throw new NotFoundError("Kullanıcı bulunamadı");
        }

        // DTO'dan entities'e dönüşüm
        const updatedUser = UserDTO.toUpdateEntity(user, updateUserRequest);

        // Kaydet ve response'a dönüştür
        const savedUser = await getUserRepository().save(updatedUser);
        res.json(UserDTO.toResponse(savedUser));
    }

    /**
     * Kullanıcıyı siler
     */
    static async deleteUser(req: Request, res: Response): Promise<void> {
        const id = req.params["id"];
        const user = await getUserRepository().findOne({ where: { id: parseInt(id) } });

        if (!user) {
            throw new NotFoundError("Kullanıcı bulunamadı");
        }

        await getUserRepository().remove(user);
        res.status(200).json({ message: "Kullanıcı başarıyla silindi" });
    }
}

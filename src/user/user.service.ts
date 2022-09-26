import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddUserArgs } from "./args/add.user.args";
import { UpdateUserArgs } from "./args/update.user.args";
import { UserEntity } from "./entity/user.entity";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) public readonly userRepository: Repository<UserEntity>) {

    }
    async deleteUser(id: number): Promise<string> {
        await this.userRepository.delete(id);
        return "User has been deleted!"
    }

    async findUserById(id: number): Promise<UserEntity> {
        let book = await this.userRepository.findOne({ where: { id: id } });
        return book;
    }

    async findAllUsers(): Promise<UserEntity[]> {
        let users = await this.userRepository.find();
        return users;
    }

    async addUser(addUserArgs: AddUserArgs): Promise<string> {
        let user: UserEntity = new UserEntity();
        user.name = addUserArgs.name;
        user.email = addUserArgs.email;

        await this.userRepository.save(user);

        return "User has been saved successfully!"

    }

    async updateBook(updateUserArgs: UpdateUserArgs): Promise<string> {
        const id = Number(updateUserArgs.id)
        try {
            let user: UserEntity = await this.userRepository.findOne({ where: { id: id } });
            user.name = updateUserArgs.name;
            user.email = updateUserArgs.email;

            await this.userRepository.save(user);

            return "User has been Updated successfully!";

        } catch (error) {
        }


    }
}
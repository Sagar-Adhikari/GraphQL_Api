import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddUserArgs } from "./args/add.user.args";
import { LoginUserArgs } from "./args/login-user.args";
import { UpdateUserArgs } from "./args/update.user.args";
import { UserEntity } from "./entity/user.entity";
import { User } from "./schema/user.schema";

import * as jwt from "jsonwebtoken";

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) public readonly userRepository: Repository<UserEntity>) {

    }


    async findUserByEmail(email: string) {
        let user: UserEntity = await this.userRepository.findOne({ where: { email: email } });
        return user;
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
        console.log('add user:::: mutation triggered')
        let user: UserEntity = new UserEntity();
        user.firstName = addUserArgs.firstName;
        user.lastName = addUserArgs.lastName;
        user.email = addUserArgs.email;
        user.password = addUserArgs.password;
        user.role = addUserArgs.role;

        console.log('User:::', user);
        await this.userRepository.save(user);
        return "User has been saved successfully!"

    }

    async login(loginUser: LoginUserArgs): Promise<any> {
        // try {
        const user: UserEntity = await this.userRepository.findOne({ where: { email: loginUser.email } });
        console.log('find user', user)
        let payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
        const token = jwt.sign(payload, "key", { expiresIn: "600s" });



        return token;
        // } catch (error) {
        //     console.log("Logged in exception", error)

        // }

    }

    async updateBook(updateUserArgs: UpdateUserArgs): Promise<string> {
        const id = Number(updateUserArgs.id)
        try {
            let user: UserEntity = await this.userRepository.findOne({ where: { id: id } });
            user.firstName = updateUserArgs.name;
            user.email = updateUserArgs.email;

            await this.userRepository.save(user);

            return "User has been Updated successfully!";

        } catch (error) {
        }


    }
}
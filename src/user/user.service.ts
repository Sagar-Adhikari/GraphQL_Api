import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddUserArgs } from "./dto/add.user.args";
import { LoginUserInput } from "./dto/login-user.args";
import { UpdateUserArgs } from "./dto/update.user.args";
import { User } from "./entity/user.entity";
import { UserDocument } from "./schema/user.schema";

import * as jwt from "jsonwebtoken";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) public readonly userRepository: Repository<User>) {

    }


    async findUserByEmail(email: string) {
        let user: User = await this.userRepository.findOne({ where: { email: email } });
        return user;
    }

    async deleteUser(id: number): Promise<string> {
        await this.userRepository.delete(id);
        return "User has been deleted!"
    }

    async findUserById(id: number): Promise<User> {
        let book = await this.userRepository.findOne({ where: { id: id } });
        return book;
    }

    async findAllUsers(): Promise<User[]> {
        let users = await this.userRepository.find();
        return users;
    }

    async addUser(addUserArgs: AddUserArgs): Promise<string> {
        console.log('add user:::: mutation triggered')
        let user: User = new User();
        user.firstName = addUserArgs.firstName;
        user.lastName = addUserArgs.lastName;
        user.email = addUserArgs.email;
        user.password = addUserArgs.password;
        user.role = addUserArgs.role;

        console.log('User:::', user);
        await this.userRepository.save(user);
        return "User has been saved successfully!"

    }

    async login(loginUser: LoginUserInput): Promise<any> {
        // try {
        const user: User = await this.userRepository.findOne({ where: { email: loginUser.email } });
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
            let user: User = await this.userRepository.findOne({ where: { id: id } });
            user.firstName = updateUserArgs.name;
            user.email = updateUserArgs.email;

            await this.userRepository.save(user);

            return "User has been Updated successfully!";

        } catch (error) {
        }


    }
}
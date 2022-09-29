import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "src/user/entity/user.entity";
import { LoginUserInput } from "src/user/dto/login-user.args";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) public readonly userRepository: Repository<User>) {

    }

    async validateUser(email: string, password: string) {
        const user: User = await this.userRepository.findOne({ where: { email: email } });
        if (user.email === email && user.password === password) {
            const { password, ...response } = user;
            return response;
        } else {
            return null;
        }
    }

    async login(loginUserInput: LoginUserInput) {
        const user = await this.userRepository.findOne({ where: { email: loginUserInput.email } });

        return {
            access_token: 'token',
            user
        }
    }

}
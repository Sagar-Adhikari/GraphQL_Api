import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { User } from "./entity/user.entity";
import { AuthGuard } from "src/auth/auth.guard";
import { JwtGuard } from "src/auth/jwt.guard";
import { RoleGuard } from "src/auth/role.guard";
import { AuthService } from "src/auth/auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UserService],
    providers: [UserResolver, AuthService, UserService, AuthGuard, JwtGuard, RoleGuard]

})
export class UserModule {

}
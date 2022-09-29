import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { UserEntity } from "./entity/user.entity";
import { AuthGuard } from "src/auth/auth.guard";
import { JwtGuard } from "src/auth/jwt.guard";
import { RoleGuard } from "src/auth/role.guard";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    exports: [UserService],
    providers: [UserResolver, UserService, AuthGuard, JwtGuard, RoleGuard]

})
export class UserModule {

}
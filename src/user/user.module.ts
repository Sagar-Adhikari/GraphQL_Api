import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { UserEntity } from "./entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    exports: [],
    providers: [UserResolver, UserService]

})
export class UserModule {

}
import { Args, Context, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { AddUserArgs } from "./args/add.user.args";
import { UpdateUserArgs } from "./args/update.user.args";
import { User } from "./schema/user.schema";
import { AuthGuard } from "src/auth/auth.guard";
import { UseGuards } from "@nestjs/common";


import { JwtGuard } from "src/auth/jwt.guard";
import { RoleGuard, Roles } from "src/auth/role.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { LoginUserArgs } from "./args/login-user.args";
import { UserEntity } from "./entity/user.entity";

@Resolver(of => User)
export class UserResolver {
    //Queries and mutation
    constructor(private readonly userService: UserService) { }

    @Query(returns => String)
    testQuery() {
        return "This is test query";
    }

    @Mutation(returns => String, { name: 'addUser' })
    addUser(@Args("addUserArgs") addUserArgs: AddUserArgs) {
        console.log('add user:::: mutation triggered')
        return this.userService.addUser(addUserArgs);
    }

    @Mutation(returns => String, { name: "login" })
    @UseGuards()
    async login(@Args("loginUserArgs") loginUserArgs: LoginUserArgs,
    ): Promise<any> {
        console.log('Login:::: mutation triggered')
        return await this.userService.login(loginUserArgs);

    }

    @Query(returns => String)
    @UseGuards(JwtGuard)
    securedLogin() {
        return "This is Jwt Secured login";
    }

    @Query(returns => String)
    @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
    securedRoleForAdmin() {
        return "This is Jwt Secured Role-Admin";
    }

    @Query(returns => String)
    @UseGuards(JwtGuard, new RoleGuard(Roles.NORMAL_USER))
    securedRoleForNormalUser() {
        return "This is Jwt Secured Role-User";
    }

    @UseGuards(JwtGuard)
    @Query(() => User, { name: 'me' })
    getMe(@CurrentUser() user: User) {
        return user;
    }


    @Query(returns => [User], { name: "users" })
    getAllUsers() {
        return this.userService.findAllUsers();
    }

    @Query(returns => User, { name: "userById" })
    getUserById(@Args({ name: 'userId', type: () => Int }) id: number) {
        return this.userService.findUserById(id);
    }

    @Mutation(returns => String, { name: 'deleteUser' })
    deleteUserById(@Args({ name: 'userId', type: () => Int }) id: number) {
        return this.userService.deleteUser(id);
    }


    @Mutation(returns => String, { name: 'updateUser' })
    updateUser(@Args("updateUserArgs") updateUserArgs: UpdateUserArgs) {
        return this.userService.updateBook(updateUserArgs);
    }
}



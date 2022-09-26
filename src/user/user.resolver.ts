import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Book as BookModel } from "../graphql"
import { UserService } from "./user.service";
import { AddUserArgs } from "./args/add.user.args";
import { UpdateUserArgs } from "./args/update.user.args";
import { User } from "./schema/user.schema";

@Resolver(of => User)
export class UserResolver {
    //Queries and mutation
    constructor(private readonly userService: UserService) { }

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

    @Mutation(returns => String, { name: 'addUser' })
    addUser(@Args("addUserArgs") addUserArgs: AddUserArgs) {
        return this.userService.addUser(addUserArgs);
    }

    @Mutation(returns => String, { name: 'updateUser' })
    updateUser(@Args("updateUserArgs") updateUserArgs: UpdateUserArgs) {
        return this.userService.updateBook(updateUserArgs);
    }
}



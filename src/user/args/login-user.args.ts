import { Field, InputType } from "@nestjs/graphql";

//This file is similar to dto in REST Apis
@InputType()
export class LoginUserArgs {
    @Field(type => String)
    email: string;

    @Field(type => String)
    password: string;

}
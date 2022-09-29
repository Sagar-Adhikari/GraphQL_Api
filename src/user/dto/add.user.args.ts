import { Field, InputType } from "@nestjs/graphql";


//This file is similar to dto in REST Apis
@InputType()
export class AddUserArgs {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field(type => String)
    email: string;

    @Field(type => String)
    password: string;

    @Field(type => String)
    role: string;
}
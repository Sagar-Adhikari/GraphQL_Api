import { Field, InputType, Int } from "@nestjs/graphql";


//This file is similar to dto in REST Apis
@InputType()
export class UpdateUserArgs {
    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field(type => Int)
    email: string;
}
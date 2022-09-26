import { Field, InputType, Int } from "@nestjs/graphql";


//This file is similar to dto in REST Apis
@InputType()
export class UpdateBookArgs {
    @Field(type => Int)
    id: number;

    @Field()
    title: string;

    @Field(type => Int)
    price: number;
}

import { Field, Int, ObjectType } from '@nestjs/graphql';

//Basically, schema is exposed to outer world like frontend 
//so the Credential data should not be written here like user's password
@ObjectType()
export class Book {
    @Field(type => Int)
    id: number;

    @Field()
    title: string;

    @Field((type) => Int)
    price: number;

}
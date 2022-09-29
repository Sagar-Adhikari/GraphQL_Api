
import { Field, Int, ObjectType } from '@nestjs/graphql';

//Basically, schema is exposed to outer world like frontend 
//so the Credential data should not be written here like user's password
@ObjectType()
export class User {
    @Field(type => Int)
    id: number;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    role: string;

    @Field((type) => String)
    email: string;

}
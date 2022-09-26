import { Query, Resolver } from "@nestjs/graphql";
import { Book } from "./book.schema";
import { Book as BookModel } from "../graphql"

@Resolver(of => Book)
export class BookResolver {
    @Query(returns => [Book])
    getAllBooks() {
        let arr: BookModel[] = [
            { id: 1, title: 'Book', price: 500 },
            { id: 1, title: 'Book1', price: 300 },
            { id: 1, title: 'Book2', price: 200 },
            { id: 1, title: 'Book3', price: 600 },
            { id: 1, title: 'Book4', price: 700 }

        ]
        return arr;

    }
}
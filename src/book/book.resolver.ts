import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Book as BookModel } from "../graphql"
import { BookService } from "./book.service";
import { AddBookArgs } from "./args/add.book.args";
import { Book } from "./schema/book.schema";
import { UpdateBookArgs } from "./args/update.book.args";

@Resolver(of => Book)
export class BookResolver {
    //Queries and mutation
    constructor(private readonly booksService: BookService) { }

    @Query(returns => [Book], { name: "books" })
    getAllBooks() {
        return this.booksService.findAllBooks();
    }

    @Query(returns => Book, { name: "bookById" })
    getBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
        return this.booksService.findBookById(id);
    }

    @Mutation(returns => String, { name: 'deleteBook' })
    deleteBookById(@Args({ name: 'bookId', type: () => Int }) id: number) {
        return this.booksService.deleteBook(id);
    } 

    @Mutation(returns => String, { name: 'addBook' })
    addBook(@Args("addBookArgs") addBookArgs: AddBookArgs) {
        return this.booksService.addBook(addBookArgs);
    }

    @Mutation(returns => String, { name: 'updateBook' })
    updateBook(@Args("updateBookArgs") updateBookArgs: UpdateBookArgs) {
        return this.booksService.updateBook(updateBookArgs);
    }
}


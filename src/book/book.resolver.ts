import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Book } from "./book.schema";
import { Book as BookModel } from "../graphql"
import { BookService } from "./book.service";
import { AddBookArgs } from "./args/add.book.args";

@Resolver(of => Book)
export class BookResolver {
    //Queries and mutation
    constructor(private readonly booksService: BookService) { }

    @Query(returns => [Book], { name: 'books' })
    getAllBooks(): BookModel[] {
        return this.booksService.findAllBooks();
    }

    @Query(returns => Book, { name: 'findBookById', nullable: true })
    getBookById(@Args({ name: 'bookId', type: () => Int }) id: number): BookModel {
        return this.booksService.findBookById(id);
    }

    @Mutation(returns => String, { name: 'deleteBook' })
    deleteBookById(@Args({ name: 'bookId', type: () => Int }) id: number): string {
        console.log(id);
        return this.booksService.deleteBook(id);
    } 

    @Mutation(returns => String, { name: 'addBook' })
    addBook(@Args("addBookArgs") addBookArgs: AddBookArgs): string {
        return this.booksService.addBook(addBookArgs);
    }

    @Mutation(returns => String, { name: 'updateBook' })
    updateBook(@Args({ name: 'bookId', type: () => Int }) id: number, @Args("updateBookArgs") updateBookArgs: AddBookArgs): string {
        console.log(id);
        return this.booksService.updateBook(id, updateBookArgs);
    }
}



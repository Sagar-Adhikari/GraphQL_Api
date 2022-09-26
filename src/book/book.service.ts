import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddBookArgs } from "./args/add.book.args";
import { UpdateBookArgs } from "./args/update.book.args";
import { BookEntity } from "./entity/book.entity";

@Injectable()
export class BookService {
    constructor(@InjectRepository(BookEntity) public readonly bookRepository: Repository<BookEntity>) {

    }
    async deleteBook(id: number): Promise<string> {
        await this.bookRepository.delete(id);
        return "Book has been deleted!"
    }

    async findBookById(id: number): Promise<BookEntity> {
        let book = await this.bookRepository.findOne({ where: { id: id } });
        return book;
    }

    async findAllBooks(): Promise<BookEntity[]> {
        let books = await this.bookRepository.find();
        return books;
    }

    async addBook(addBookArgs: AddBookArgs): Promise<string> {
        let book: BookEntity = new BookEntity();
        book.title = addBookArgs.title;
        book.price = addBookArgs.price;

        await this.bookRepository.save(book);

        return "Book has been saved successfully!"

    }


    async updateBook(updateBookArgs: UpdateBookArgs): Promise<string> {
        console.log("Update args:", updateBookArgs);
        const id = Number(updateBookArgs.id)
        try {
            let book: BookEntity = await this.bookRepository.findOne({ where: { id: id } });
            console.log('Update::::::::::::::', book);
            book.title = updateBookArgs.title;
            book.price = updateBookArgs.price;

            await this.bookRepository.save(book);

            return "Book has been Updated successfully!";

        } catch (error) {
            console.log("Catch Block:::::", error)
        }


    }
}
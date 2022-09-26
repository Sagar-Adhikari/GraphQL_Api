import { Injectable } from "@nestjs/common";
import { BookEntity } from "./entity/book.entity";

@Injectable()

export class BookService {
    constructor() {

    }
    public booksData: BookEntity[] = [];

    addBook(book: BookEntity): string {
        this.booksData.push(book);
        return "Books added successfully!"
    }

    updateBook(id: number, updateBook: BookEntity): string {
        for (let i = 0; i < this.booksData.length; i++) {
            if (this.booksData[i].id === id) {
                this.booksData[i] = updateBook;
            }
        }
        return "Books Updated successfully!"
    }

    deleteBook(id: number): string {
        this.booksData.filter((book) => book.id !== id);
        return "Book deleted successfully!"

    }


    findBookById(id: number) {
        for (let i = 0; i < this.booksData.length; i++) {
            if (this.booksData[i].id === id) {
                return this.booksData[i]
            }
        }
    }

    findAllBooks(): BookEntity[] {
        return this.booksData;
    }
}
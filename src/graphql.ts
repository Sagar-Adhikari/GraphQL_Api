
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddBookArgs {
    title: string;
    price: number;
}

export interface UpdateBookArgs {
    id: number;
    title: string;
    price: number;
}

export interface AddUserArgs {
    name: string;
    email: number;
}

export interface UpdateUserArgs {
    id: number;
    name: string;
    email: number;
}

export interface Book {
    id: number;
    title: string;
    price: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface IQuery {
    index(): string | Promise<string>;
    books(): Book[] | Promise<Book[]>;
    bookById(bookId: number): Book | Promise<Book>;
    users(): User[] | Promise<User[]>;
    userById(userId: number): User | Promise<User>;
}

export interface IMutation {
    deleteBook(bookId: number): string | Promise<string>;
    addBook(addBookArgs: AddBookArgs): string | Promise<string>;
    updateBook(updateBookArgs: UpdateBookArgs): string | Promise<string>;
    deleteUser(userId: number): string | Promise<string>;
    addUser(addUserArgs: AddUserArgs): string | Promise<string>;
    updateUser(updateUserArgs: UpdateUserArgs): string | Promise<string>;
}

type Nullable<T> = T | null;

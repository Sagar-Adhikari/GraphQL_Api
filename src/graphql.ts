
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddUserArgs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface UpdateUserArgs {
    id: number;
    name: string;
    email: number;
}

export interface AddBookArgs {
    title: string;
    price: number;
}

export interface UpdateBookArgs {
    id: number;
    title: string;
    price: number;
}

export interface Book {
    id: number;
    title: string;
    price: number;
}

export interface UserDocument {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
}

export interface IQuery {
    index(): string | Promise<string>;
    testQuery(): string | Promise<string>;
    securedLogin(): string | Promise<string>;
    securedRoleForAdmin(): string | Promise<string>;
    securedRoleForNormalUser(): string | Promise<string>;
    me(): UserDocument | Promise<UserDocument>;
    users(): UserDocument[] | Promise<UserDocument[]>;
    userById(userId: number): UserDocument | Promise<UserDocument>;
    books(): Book[] | Promise<Book[]>;
    bookById(bookId: number): Book | Promise<Book>;
}

export interface IMutation {
    addUser(addUserArgs: AddUserArgs): string | Promise<string>;
    login(loginUserInput: LoginUserInput): string | Promise<string>;
    deleteUser(userId: number): string | Promise<string>;
    updateUser(updateUserArgs: UpdateUserArgs): string | Promise<string>;
    deleteBook(bookId: number): string | Promise<string>;
    addBook(addBookArgs: AddBookArgs): string | Promise<string>;
    updateBook(updateBookArgs: UpdateBookArgs): string | Promise<string>;
}

type Nullable<T> = T | null;

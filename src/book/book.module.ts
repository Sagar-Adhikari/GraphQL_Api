import { Module } from "@nestjs/common";
import { BookResolver } from "./book.resolver";

@Module({
    imports: [],
    exports: [],
    providers: [BookResolver]

})
export class BookModule {

}
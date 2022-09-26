import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BookModule } from './book/book.module';
import { AppResolver } from './app.resolvers';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), "src/schema.graphql"),
      definitions: {
        //generate generated interface for schemas
        //need to install npm pkg ts-morph
        path: join(process.cwd(), "src/graphql.ts"),
      }
    }),
    BookModule
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { BookModule } from './book/book.module';
import { AppResolver } from './app.resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      cors: {
        origin: '*',
        credentials: true,
      },
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

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'car_dev',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //entities is require otherwise table is not shown in database
      synchronize: true,
      //shouldn't use in production
    }),
    BookModule,

  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { createContext } from './context';
import { AuthModule } from './auth/auth.module';
import { ScalarsModule } from './scalars/scalars.module';
import { ResolversModule } from './resolvers/resolvers.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './src/schema.graphql',
      playground: true,
      context: createContext,
      cors: true,
    }),
    ResolversModule,
    AuthModule,
    ScalarsModule,
    UserModule,
    PostModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  providers: [],
})
export class AppModule {}

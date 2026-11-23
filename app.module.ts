import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (config: ConfigService) => {
  console.log('ENVIRONMENT CHECK:', {
    host: config.get('DB_HOST'),
    username: config.get('DB_USERNAME'),
    database: config.get('DB_DATABASE'),
    password: config.get('DB_PASSWORD'),
    passwordType: typeof config.get('DB_PASSWORD'),
  });

  return {
    type: 'postgres' as const,
    host: config.get<string>('DB_HOST'),
    port: Number(config.get('DB_PORT') ?? 5432),
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_DATABASE'),
    autoLoadEntities: true,
    synchronize: false,
  };
},
    }),
  ],
})
export class AppModule {}
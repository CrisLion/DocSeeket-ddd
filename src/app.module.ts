import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      url: 'mysql://root:71950810@localhost:3306/docseeker-ddd-scratch',
      migrationsRun: true,
      logging: true,
      timezone: '+00:00',
      bigNumberStrings: false,
      entities: [
        'dist/**/infrastructure/persistence/entities/*{.ts,.js}'
      ],
      subscribers: [],
      migrations: [
        'dist/shared/infrastructure/persistence/migrations/*{.ts,.js}'
      ],
      migrationsTableName: "migrations"
    }),
    UsersModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestModifierMiddleware } from "./@application/middleware/requestModifier.middleware";
import { AuthModule } from "./@modules/auth/auth.module";
import { ConsumerModule } from "./@modules/consumers/consumer.module";
import { InvoiceModule } from "./@modules/invoices/invoice.module";
import { ProductModule } from "./@modules/products/product.module";
import { UserModule } from "./@modules/users/user.module";
import { ENV } from "./ENV";

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConsumerModule,
    InvoiceModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: ENV.TYPEORM_CONNECTION as any,
      host: ENV.TYPEORM_HOST,
      port: ENV.TYPEORM_PORT as any,
      username: ENV.TYPEORM_USERNAME,
      password: ENV.TYPEORM_PASSWORD,
      database: ENV.TYPEORM_DATABASE,
      autoLoadEntities: true,
      logging: ENV.TYPEORM_LOGGING as any,
      synchronize: ENV.TYPEORM_SYNCHRONIZE as any,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestModifierMiddleware).forRoutes('*');
  }
}

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestModifierMiddleware } from "./@application/middleware/requestModifier.middleware";
import { AuthModule } from "./@modules/auth/auth.module";
import { ConsumerModule } from "./@modules/consumers/consumer.module";
import { InvoiceModule } from "./@modules/invoices/invoice.module";
import { ProductModule } from "./@modules/products/product.module";
import { UserModule } from "./@modules/users/user.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConsumerModule,
    InvoiceModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "reshop",
      password: "737467",
      database: "biller_db",
      autoLoadEntities: true,
      logging: false,
      synchronize: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestModifierMiddleware).forRoutes('*');
  }
}

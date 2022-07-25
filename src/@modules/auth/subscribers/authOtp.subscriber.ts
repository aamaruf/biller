import { InjectConnection, InjectEntityManager } from "@nestjs/typeorm";
import {
  Connection,
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { AuthOTP } from "../entities/auth-otp.entity";

@EventSubscriber()
export class AuthOTPSubscriber implements EntitySubscriberInterface {
  constructor(@InjectConnection() readonly connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return AuthOTP;
  }

  async beforeInsert(event: InsertEvent<AuthOTP>) {
    console.log("🚀 ~  ~ AuthOTPSubscriber ~ beforeInsert ~ event", event);
    const date = new Date();
    date.setMinutes(date.getMinutes() + 1);

    event.entity.expiryDate = date;
  }

  async beforeUpdate(event: UpdateEvent<AuthOTP>) {
    console.log("🚀 ~  ~ AuthOTPSubscriber ~ beforeInsert ~ event", event);
    const date = new Date();
    date.setMinutes(date.getMinutes() + 5);

    event.entity.expiryDate = date;
  }

  async afterLoad(authOTP: AuthOTP) {
    const date = new Date();

    if (date > authOTP.expiryDate) {
      authOTP.isExpired = true;
    } else {
      authOTP.isExpired = false;
    }
  }
}

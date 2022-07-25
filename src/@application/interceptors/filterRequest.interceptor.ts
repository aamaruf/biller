import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';

@Injectable()
export class FilterRequestInterceptor implements NestInterceptor {

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    return next.handle()
    // const req: any = context.switchToHttp().getRequest();

    // const options: IOptions = req.reqOptions;
    // const serviceClassName: string = getEntityNameFromReq(req);

    // if (!this.ROUTES_EXCEPTED.includes(serviceClassName.toLowerCase())) {
    //   //? Get Entity Properties
    //   const properties: IProperties = await getEntityPropertiesWithId(
    //     serviceClassName
    //   );
    //   //? Filter Relations
    //   try {
    //     if (options.relations) {
    //       const relations = [];
    //       options.relations.map((r) => {
    //         if (properties.relations.includes(r)) {
    //           relations.push(r);
    //         }
    //       });
    //       options.relations = relations;
    //     }
    //   } catch (error) {
    //     throw new MalformedRequestError(MALFORMED_REQUEST, 'Invalid Relations');
    //   }

    //   //? Filter Selects
    //   try {
    //     if (options.selects) {
    //       const selects = [];
    //       options.selects.map((s) => {
    //         if (properties.ownColumns.includes(s)) {
    //           selects.push(s);
    //         }
    //       });
    //       options.selects = selects;
    //     }
    //   } catch (error) {
    //     throw new MalformedRequestError(MALFORMED_REQUEST, 'Invalid selects');
    //   }

    //   //? Order
    //   try {
    //     if (options.order) {
    //       if (!properties.orders.includes(options.order[0])) {
    //         delete options.order;
    //       }
    //     }
    //   } catch (error) {
    //     throw new MalformedRequestError(
    //       MALFORMED_REQUEST,
    //       'Order can not be used if selects is not used'
    //     );
    //   }
    // }

    // return next.handle().pipe(
    //   tap(async (response) => {}),
    //   catchError(async (error) => {
    //     throw error;
    //   })
    // );
  }
}

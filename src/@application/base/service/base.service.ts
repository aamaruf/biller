import { createTypeORMFindByIdOptions } from "src/@application/utils/service.utils";
import {
  FindOneOptions,
  InsertResult,
  Repository
} from "typeorm";

export abstract class BaseService<Entity>  {
  repository: Repository<Entity>;
  // dataSource: DataSource;
  entityName: string;

  constructor(repository: Repository<Entity>, entityName: string) {
    // super();
    this.repository = repository;
    this.entityName = entityName;
  }

  async insertIntoDB(payload: Entity): Promise<Entity> {
    try {
      const result: InsertResult = await this.repository.insert(payload);
      return this.repository.findOne({ where: { id: result.identifiers[0].id } } as any).catch((err) => {
        throw new Error(err?.detail);
      });
    } catch (error) {
      return error;
    }
  }

  async updateIntoDB(id: string, payload: Entity): Promise<any> {
    try {
      await this.repository.update(id, payload);
      return this.repository.findOne({}).catch((err) => {
        return err;
      });
    } catch (error) {
      return error;
    }
  }

  async bulkUpdateIntoDB(reqOptions: any, entity: Entity): Promise<any> {
    try {
      if (!reqOptions.ids) {
        throw new Error(`${this.entityName} ids not provided`);
      }
      await this.repository.update(reqOptions.ids, entity).catch((err) => {
        throw new Error(err?.name);
      });
      return {
        message: `${this.entityName} bulk update success`,
        ids: reqOptions.ids,
      };
    } catch (error) {
      return error;
    }
  }

  async deleteFromDB(id: string): Promise<any> {
    try {
      await this.repository.softDelete(id).catch((err) => {
        throw new Error(err?.name);
      });
      return { message: `${this.entityName} data successfully deleted`, id };
    } catch (error) {
      return error;
    }
  }

  async getByIdFromDB(id: string, options?: any): Promise<Entity> {
    console.log("🚀🚀🚀🚀🚀 ============ getByIdFromDB ============ id", id)
    try {

      const opts: FindOneOptions = await createTypeORMFindByIdOptions(
        id,
        options
      );
      console.log("🚀🚀🚀🚀🚀 ============ getByIdFromDB ============ opts", opts)

      return await this.repository.findOne(opts).catch((err) => {
        throw new Error(err?.name);
      });
      // return data || new NotFoundException("no data found with this id 😭");
    } catch (error) {
      return error;
    }
  }

  // async getByCriteriaFromDB(criteria: Entity, options: any): Promise<Entity> {
  //   try {
  //     const opts: FindOneOptions = await createTypeORMFindOneOptions(
  //       criteria,
  //       options,
  //       this.entityName
  //     );

  //     const entity = await this.repository.findOne(opts).catch((err) => {
  //       throw new Error(err?.name);
  //     });

  //     return entity;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // async getAllFromDB(
  //   options: any,
  //   filters: Entity,
  //   connectionName?: string
  // ): Promise<any> {
  //   try {
  //     let result = { data: null, total: 0 };

  //     options.order
  //       ? options.order
  //       : {
  //           stock: "DESC",
  //         };

  //     if (options.single) {
  //       const opts: FindOneOptions = await createTypeORMFindOneOptions(
  //         filters,
  //         options,
  //         this.entityName,
  //         connectionName
  //       );
  //       result.data = await this.repository.findOne(opts).catch((err) => {
  //         throw new Error(err?.name);
  //       });
  //     } else {
  //       const opts: FindManyOptions = await createTypeORMFindManyOptions(
  //         filters,
  //         options,
  //         this.entityName,
  //         connectionName
  //       );

  //       const res = await this.repository.findAndCount(opts).catch((err) => {
  //         console.log(err);

  //         throw new Error(err?.name);
  //       });

  //       if (res.length === 2) {
  //         result.data = res[0];
  //         result.total = res[1];
  //       }
  //     }
  //     return {
  //       payload: result.data,
  //       total: result.total,
  //       take: options.take,
  //       page: options.page || false,
  //     };
  //   } catch (error) {
  //     return error;
  //   }
  // }
}


import { Between, FindManyOptions, FindOneOptions, Raw } from "typeorm";
import { OrderOptions } from "../enums";
import { IOptions } from "../interfaces";
import { AfterDate, BeforeDate, getEntityProperties } from "./util.function";

export const createTypeORMFindManyOptions = async (
  filters: any,
  options: IOptions,
  entity: any,
  connectionName?: string
): Promise<FindManyOptions> => {
  const properties = await getEntityProperties(entity, connectionName);
  const opts: FindManyOptions = {};

  properties.ownColumns = [...properties.ownColumns, ...properties.relations];

  if (
    options.searchTerm &&
    properties.searchTerms &&
    properties.searchTerms.length
  ) {
    opts.where = [];
    const where = [];
    properties.searchTerms.map((c) => {
      let criterias;

      //? Between
      if (options.between && options.startDate && options.endDate) {
        criterias = {
          createdAt: Between(options.startDate, options.endDate),
          [c]: Raw(
            (alias) =>
              `LOWER(${alias}) LIKE '%${options.searchTerm.toLowerCase()}%'`
          ),
        };
      }
      //? Before
      else if (options.before) {
        criterias = {
          createdAt: BeforeDate(options.before),
          [c]: Raw(
            (alias) =>
              `LOWER(${alias}) LIKE '%${options.searchTerm.toLowerCase()}%'`
          ),
        };
      }
      //? After
      else if (options.after) {
        criterias = {
          createdAt: AfterDate(options.after),
          [c]: Raw(
            (alias) =>
              `LOWER(${alias}) LIKE '%${options.searchTerm.toLowerCase()}%'`
          ),
        };
      }
      //? Others
      else {
        criterias = {
          [c]: Raw(
            (alias) =>
              `LOWER(${alias}) LIKE '%${options.searchTerm.toLowerCase()}%'`
          ),
        };
      }

      const mainCriterias: any = {
        ...criterias,
        ...filters,
      };
      console.log(
        "🚀 ~ file: service.utils.ts ~ line 68 ~ properties.searchTerms.map ~ mainCriterias",
        mainCriterias
      );
      where.push(mainCriterias);
      console.log(
        "🚀 ~ file: service.utils.ts ~ line 72 ~ properties.searchTerms.map ~ where",
        where
      );
    });

    opts.where = where;
  } else {
    opts.where = {};

    properties.ownColumns.map((c) => {
      if (filters) {
        if (Object.keys(filters).includes(c)) {
          opts.where[c] = filters[c];
        }
      }
    });

    if (options.between && options.startDate && options.endDate) {
      opts.where.createdAt = Between(options.startDate, options.endDate);
    } else if (options.before) {
      opts.where.createdAt = BeforeDate(options.before);
    } else if (options.after) {
      opts.where.createdAt = AfterDate(options.after);
    }
  }

  if (options.selects && options.selects.length !== 1) {
    opts.select = options.selects;
  }

  if (options.relations && options.relations.length > 0) {
    opts.relations = options.relations;
  }

  let stringToPush: string;
  if (options.order) {
    opts.order = {
      [options.order[0]]: options.order[1],
    };
    stringToPush = options.order[0];
  } else {
    opts.order = {
      ["createdAt"]: OrderOptions.DESC,
    };
    stringToPush = "createdAt";
  }

  // if (!opts?.select?.includes(stringToPush)) {
  //   opts?.select?.push(stringToPush);
  // }

  if (!options.fetchAll && options.take !== "all") {
    opts.take = options.take;
    opts.skip = options.skip;
  }

  return opts;
};

export const createTypeORMFindOneOptions = async (
  filters: any,
  options: IOptions,
  entity: any,
  connectionName?: string
): Promise<FindOneOptions> => {
  const properties = await getEntityProperties(entity, connectionName);
  const opts: FindOneOptions = {};

  properties.ownColumns = [...properties.ownColumns, ...properties.relations];

  opts.where = {};

  properties.ownColumns.map((c) => {
    if (Object.keys(filters).includes(c)) {
      opts.where[c] = filters[c];
    }
  });

  if (options.selects && options.selects.length !== 1) {
    opts.select = options.selects;
  }

  if (options.relations && options.relations.length > 0) {
    opts.relations = options.relations;
  }

  return opts;
};

export const createTypeORMFindByIdOptions = async (
  id: string,
  options: IOptions
): Promise<FindOneOptions> => {
  const opts: FindOneOptions = {};
  opts.where = typeof id === "string" ? { id } : id;
  if (options?.selects && options?.selects?.length !== 1) {
    opts.select = options.selects;
  }
  if (options?.relations && options?.relations.length > 0) {
    opts.relations = options.relations;
  }
  return opts;
};

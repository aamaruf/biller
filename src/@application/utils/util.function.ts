import { addYears, subYears } from "date-fns";
import * as FS from "fs";
import * as moment from "moment";
import { diskStorage } from "multer";
import * as path from "path";
import * as Pluralize from "pluralize";
import * as slugify from "slugify";
import {
  Between,
  FindManyOptions,
  getConnection,
  getRepository
} from "typeorm";
import { IProperties } from "../interfaces";

export const asyncForEach = async (array: any[], callback: any) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const convertNullString = async (data: any) => {
  if (data === "null") {
    return null;
  } else {
    return data;
  }
};

export const storageImageOptions = diskStorage({
  destination: "./uploads/images",
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

export const getPrefixName = async (str) => {
  str = str.replace(/ /g, "");
  let prefixName = "";
  return (prefixName = str.substring(0, 3));
};

export const camelCaseToSeperateString = async (str: any) => {
  const result = str.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export const reverseWords = async (s: any) => {
  const arr = s.split(" ");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "") {
      arr.splice(i, 1);
      i--;
    }
  }
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
  return arr.join(" ");
};


export const isNumber = (phoneNumber: string) => {
  try {
    const regex = /^\+?01[3-9][0-9]{8}\b$/g;
    let validNumber: any;
    const number = phoneNumber.match(regex);

    if (number) {
      number.map((number: any) => {
        validNumber = number.slice(number.length - 11, number.length);
      });
      return validNumber;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
export const isEmail = (email: string) => {
  try {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validEmail: any;
    const _email = email.match(regex);

    if (_email.length) {
      validEmail = _email[0];
      return validEmail;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export function gen6digitOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

export const isUsername = (username: string) => {
  try {
    const regex = /^[a-zA-Z0-9]+$/;
    let validUsername: any;
    const _username = username.match(regex);

    if (_username.length) {
      validUsername = _username[0];
      return validUsername;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const parseObjectToArray = async (obj: any) => {
  const mappedData: any[] = [];
  Object.keys(obj).map(async (o) => {
    const payload = {
      name: await camelCaseToSeperateString(o),
      value: obj[o],
    };
    mappedData.push(payload);
  });
  return mappedData;
};

export const fileTypeFilter = (req, file, cb) => {
  if (
    file.mimetype !==
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    req.fileValidationError = "goes wrong on the mimetype";
    return cb(null, false, new Error("goes wrong on the mimetype"));
  }
  cb(null, true);
};

export const storageFileOptions = diskStorage({
  destination: "./uploads/files",
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

export const multerOptions = {
  storage: storageFileOptions,
  fileFilter: fileTypeFilter,
  limits: { fileSize: 1 * 1000 * 1000 },
};

export function generateFilename(file) {
  return `${Date.now()}${path.extname(file.originalname)}`;
}

export function toNumber(value: string): number {
  return parseInt(value, 10);
}

export function toBool(value: string): boolean {
  return value === "true";
}

export function convertToBool(value: any): boolean {
  return value === "true" || true;
}

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function extractToken(headers: any) {
  let token: string =
    headers && headers.authorization ? headers.authorization : "";
  token = token.replace(/Bearer\s+/gm, "");
  return token;
}

export async function chunkJsonArray(array: any[], dataPerChunk: number) {
  return array.reduce((result, item, index) => {
    const chunkIndex = Math.floor(index / dataPerChunk);

    if (!result[chunkIndex]) {
      result[chunkIndex] = [];
    }

    result[chunkIndex].push(item);

    return result;
  }, []);
}

export const isNumberValid = (phoneNumber: any) => {
  try {
    const regex = /^\+?(88)?0?1[3-9][0-9]{8}\b$/g;
    let validNumber: any;
    const number = phoneNumber.match(regex);

    if (number) {
      number.map((number: any) => {
        validNumber = number.slice(number.length - 11, number.length);
      });
      return validNumber;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const bdNumberPrefixValidator = (prefix: any) => {
  try {
    const regex = /^01[3-9]$/g;
    const pf = prefix.match(regex);
    if (pf != null) {
      return prefix;
    } else {
      return "Invalid Prefix";
    }
  } catch (error) {
    if (error) throw error;
  }
};

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createUniqueArray(array, property) {
  const a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i][property] === a[j][property]) {
        a.splice(j--, 1);
      }
    }
  }
  return a;
}

export const treeArray = (items: any, key: any, id?: any) => {
  id = id ? id : null;
  return items
    .filter((item) => item[key] === id)
    .map((item) => ({ ...item, children: treeArray(items, key, item.id) }));
};

export const nestedArrayToFlatArray = (items: any[], cookedArray: any[]) => {
  return items.map((cur) => {
    if (Array.isArray(cur.children) && cur.children.length) {
      const obj = { ...cur };
      obj.children = [];
      cookedArray.push(obj);
      nestedArrayToFlatArray(cur.children, cookedArray);
    } else {
      const obj = { ...cur };
      obj.children = [];
      cookedArray.push(cur);
    }
  });
};

export const groupByAttribute = (array, attr) => {
  const result = array.reduce((r, a) => {
    r[a[attr]] = r[a[attr]] || [];
    r[a[attr]].push(a);
    return r;
  }, Object.create(null));
  return result;
};

export const getArraysIntersection = (a1, a2) => {
  return a1.filter(function (n) {
    return a2.indexOf(n) !== -1;
  });
};

export function generateApiKey() {
  return "xxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (char) {
    const randomNumber = (Math.random() * 16) | 0;
    const value = char == "x" ? randomNumber : (randomNumber & 0x3) | 0x8;
    return value.toString(16).toUpperCase();
  });
}

export function CapitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function DashedToClassName(string: string) {
  return Pluralize.singular(
    string
      .split("-")
      .map((o) => CapitalizeFirstLetter(o))
      .join("")
  );
}

export function cleanObject(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
}

export function cleanSearchObject(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === "" ||
      Object.keys(obj[propName]).length === 0
    ) {
      delete obj[propName];
    }
  }
  return obj;
}

export function getEntityNameFromReq(req: any) {
  const serviceDashedName = CapitalizeFirstLetter(
    Pluralize.singular(req.path.split("/")[3])
  );
  return DashedToClassName(serviceDashedName);
}

export async function getEntityProperties(
  entityName: string,
  connectionName?: string
): Promise<IProperties> {
  try {
    let entity: any;
    if (connectionName) {
      entity = await getConnection(connectionName).getMetadata(entityName);
    } else {
      entity = await getConnection().getMetadata(entityName);
    }
    const searchTerms: string[] = entity.target.SEARCH_TERMS;
    const orders: string[] = entity.target.ORDERS;

    const ownColumns = await entity.ownColumns
      .map((column) => column.propertyName)
      .filter((colName) => colName !== "id");

    const relations = await entity.relations.map(
      (column) => column.propertyName
    );

    relations.map((r) => {
      if (ownColumns.includes(r)) {
        const i = ownColumns.indexOf(r);
        ownColumns.splice(i, 1);
      }
    });

    return { ownColumns, relations, searchTerms, orders };
  } catch (error) {
    new Error("Invalid Entity Name");
  }
}

export async function getEntityPropertiesWithId(
  entityName
): Promise<IProperties> {
  try {
    const entity: any = await getConnection().getMetadata(entityName);

    const searchTerms: string[] = entity.target.SEARCH_TERMS;
    const orders: string[] = entity.target.ORDERS;

    const ownColumns = await entity.ownColumns.map(
      (column) => column.propertyName
    );

    const relations = await entity.relations.map(
      (column) => column.propertyName
    );

    relations.map((r) => {
      if (ownColumns.includes(r)) {
        const i = ownColumns.indexOf(r);
        ownColumns.splice(i, 1);
      }
    });

    return { ownColumns, relations, searchTerms, orders };
  } catch (error) {
    new Error("Invalid Entity Name");
  }
}

export const fixNullPrototype = async (data: any) => {
  // fixes the issue of [Object: null prototype]{}
  return JSON.parse(JSON.stringify(data));
};

// export const storageOptions = diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, ENV.IMAGE_LOCAL_PATH);
//   },
//   // destination: "./uploads",
//   filename: (req, file, callback) => {
//     callback(null, generateFilename(file));
//   },
// });

export const localFileDelete = async (files) => {
  if (!files) return;
  setTimeout(async () => {
    try {
      if (Array.isArray(files)) {
        if (files.length == 1) {
          FS.unlinkSync(files[0].path);
        } else {
          await asyncForEach(files, async (file) => {
            FS.unlinkSync(file.path);
          });
        }
      } else {
        FS.unlinkSync(files.path);
      }
    } catch (err) {
      console.error(err);
    }
  }, 100);
};

export const removeDuplicateObjectFromArray = (array: any, key: any) => {
  const lookup: any = {};
  return array.filter((item: any) => {
    return lookup[item[key]] ? false : (lookup[item[key]] = true);
  });
};

// export const awsS3remover = (imgPath: string) =>
//   new Promise(async (resolve, reject) => {
//     logger.info("log from awsS3remover");
//     const s3 = new AWS.S3({ signatureVersion: "v4" });
//     s3.createBucket(
//       {
//         Bucket: ENV.AWS_BUCKET_NAME,
//       },
//       () => {
//         const params = {
//           Bucket: ENV.AWS_BUCKET_NAME,
//           Key: imgPath.split(ENV.AWS_PREFIX_URL).pop(),
//         };
//         s3.deleteObject(params, (err, data) => {
//           if (err) logger.error(err);
//           else logger.info("Successfully deleted file from bucket");
//           return data;
//         });
//       }
//     );
//   });
// export function genHexNumber() {
//   const n = (Math.random() * 0xfffff * 1000000).toString(16);
//   return n.slice(0, 10).toUpperCase();
// }

export const genHexNumber = () => {
  var randomChars = "123456789ABCDEFGHIJKLMNOPQRSTUVZXYZ";
  var result = "";
  for (var i = 0; i < 10; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * 10));
  }
  return result;
};

export function RsSlugify(name) {
  if (name) {
    return slugify.default(
      name.toLowerCase() + "-" + genHexNumber().slice(0, 5).toLowerCase()
    );
  }
}

export function SurfaceCatalogSlugify(name) {
  if (name) {
    return slugify.default(
      name.toLowerCase() + "-" + genHexNumber().slice(0, 3).toLowerCase()
    );
  }
}

export async function selectArrayBuilder(
  entityAlias: string,
  select: (string | number | symbol)[]
) {
  let newSelectArray = [];
  newSelectArray.push(entityAlias + ".id");
  newSelectArray.push(entityAlias + ".updatedAt");
  await asyncForEach(select, async (selectString: string) => {
    newSelectArray.push(entityAlias + "." + selectString);
  });
  return newSelectArray;
}

export async function orderByObjectBuilder(entityAlias: string, order: any) {
  const newOrderObj: any = {};
  Object.keys(order).forEach((key) => {
    let newKey = entityAlias + "." + key;
    newOrderObj[newKey] = order[key];
  });
  return newOrderObj;
}

// export async function orderByBuilder(
//   queryBuilder: any,
//   entityAlias: string,
//   order: any
// ) {
//   const newOrderObj: GenericObject = {};
//   let newKey: string;
//   Object.keys(order).forEach((key, index) => {
//     if (!key.includes(".")) {
//       newKey = entityAlias + "." + key;
//     } else {
//       newKey = key;
//     }
//     newOrderObj[newKey] = order[key];

//     if (key == Object.keys(order)[0]) {
//       queryBuilder.orderBy(newKey, newOrderObj[newKey]);
//     } else {
//       queryBuilder.addOrderBy(newKey, newOrderObj[newKey]);
//     }
//   });
// }

export async function relationBuilder(
  queryBuilder: any,
  entityAlias: string,
  relationArray: string[]
) {
  await asyncForEach(relationArray, async (relation: string) => {
    const nestedRelation = relation.split(".");

    if (nestedRelation && nestedRelation.length > 1) {
      let parent, child;
      parent = nestedRelation[nestedRelation.length - 2];
      child = nestedRelation[nestedRelation.length - 1];
      queryBuilder.leftJoinAndSelect(
        `${parent}.${child}`,
        child,
        `"${child}"."deletedAt" is null`
      );
    } else {
      queryBuilder.leftJoinAndSelect(
        `${entityAlias}.${nestedRelation[0]}`,
        nestedRelation[0],
        `"${nestedRelation[0]}"."deletedAt" is null`
      );
    }
  });
}

// export async function getAllDiscounts(
//   discount: Discount,
//   campaignItems: CampaignItem[],
//   originalPrice: number
// ) {
//   let discounts: any[] = [];

//   if (discount) {
//     discounts.push({
//       id: discount.id,
//       amount: discount.amount,
//       discount_type: discount.discountType,
//       discount_in_percent:
//         discount.discountType === DiscountType.Percentage
//           ? discount.amount
//           : Math.round(getPercentageFromAmount(originalPrice, discount.amount)),
//     });
//   }

// if (campaignItems && campaignItems.length) {
//   const _campaignItems = campaignItems.map((item) => {
//     return {
//       id: item.id,
//       amount: item.discountAmount,
//       discountType: item.discountType,
//       discount_in_percent:
//         item.discountType === DiscountType.Percentage
//           ? item.discountAmount
//           : Math.round(
//             getPercentageFromAmount(originalPrice, item.discountAmount)
//           ),
//     };
//   });

//   discounts = [...discounts, ..._campaignItems];
// }

// return discounts;
// }





export const firstLetterOfEachWord = (str: string) => {
  var matches = str.match(/\b(\w)/g);
  var acronym = matches.join("");
  return acronym;
};

export function paginationOptions(options: any): FindManyOptions {
  const page = Number(options.page) ? Number(options.page) : 1;
  const take = Number(options.take) ? Number(options.take) : 10;
  const skip = page === 1 ? 0 : (page - 1) * take;

  const data: FindManyOptions = {
    take,
    skip,
  };

  return data;
}

export async function betweenBuilder(
  entityAlias: string,
  between: { column: string; begin: string; end: string }
) {
  return {
    prefix: `${entityAlias}.${between.column}
  BETWEEN :begin
  AND :end`,
    suffix: { begin: between.begin, end: between.end },
  };
}

export async function uniqueArrayElementCount(array: string[]): Promise<{
  counts: {};
  uniques: string[];
}> {
  var counts = array.reduce((counts, name) => {
    counts[name] = (counts[name] || 0) + 1;
    return counts;
  }, {});

  var uniques = Object.keys(counts);

  uniques.sort((a, b) =>
    counts[a] == counts[b] ? a.localeCompare(b) : counts[b] - counts[a]
  );
  return { counts, uniques };
}

export const BeforeDate = (date: Date) => Between(subYears(date, 100), date);
export const AfterDate = (date: Date) => Between(date, addYears(date, 100));

export const mapToModel = (entity: any, dto: any) => {
  const model = new entity();
  const fields = getConnection()
    .getMetadata(entity)
    .ownColumns.map((column) => column.propertyName);
  const keys = Object.keys(dto);

  for (const key of keys) {
    if (fields.indexOf(key) != -1) {
      model[key] = dto[key];
    }
  }
  return model;
};

export const getDataFromDbUsingModel = async (
  options: any,
  entity: any,
  selects: any[]
) => {
  selects && selects.length ? selects : (selects = []);
  return await getRepository(entity).find({
    where: options,
    select: selects,
  });
};

export const getStartToEndDateTime = (startDate: string, endDate: string) => {
  const startDay = moment(startDate);
  const endDay = moment(endDate);
  return {
    start: moment(startDay).startOf("day").toDate(),
    end: moment(endDay).endOf("day").toDate(),
  };
};

export const REGEX = {
  BD_NUMBER_REGEX: /^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8}$/,
  EMAIL_REGEX:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const isValidEmail = (email: string) => {
  return email ? (email.match(REGEX.EMAIL_REGEX) ? true : false) : false;
};
export const isValidPhoneNumber = (number: string) => {
  return number ? (number.match(REGEX.BD_NUMBER_REGEX) ? true : false) : false;
};

export const isDiscountFound = (array, toBeFoundSlug) => {
  const isFound = array.find((e) => e.slug === toBeFoundSlug);
  console.log(isFound);

  return isFound ? true : false;
};

export const chunkArray = (arr: any[], perChunk: number) => {
  return arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / perChunk);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
};

export function calculateDiscountWithPercentageOrFixed(
  type: string,
  amount: number,
  discountAmount: number
) {
  let totalAmount: number = 0;
  let _discountAmount = 0;
  if (type === "fixed") {
    _discountAmount = discountAmount;
    totalAmount = amount - _discountAmount;
  }
  if (type === "percentage") {
    _discountAmount = (amount * discountAmount) / 100;
    totalAmount = amount - _discountAmount;
  }
  return {
    discountAmount: _discountAmount,
    totalAmount,
  };
}

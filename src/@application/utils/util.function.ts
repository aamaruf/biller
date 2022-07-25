import { Transform } from 'class-transformer';
import { addYears, subYears } from 'date-fns';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as Pluralize from 'pluralize';
import { Between, FindManyOptions,  } from 'typeorm';

export const asyncForEach = async (array: any[], callback: any) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const storageOptions = diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/images');
  },
  // destination: "./uploads",
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

//? Storage Image Options
export const storageImageOptions = diskStorage({
  destination: './uploads/images',
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

export const camelCaseToSeperateString = async (str: any) => {
  const result = str.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
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
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    req.fileValidationError = 'goes wrong on the mimetype';
    return cb(null, false, new Error('goes wrong on the mimetype'));
  }
  cb(null, true);
};

export const storageFileOptions = diskStorage({
  destination: './uploads/files',
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

export function toBool(value: string | boolean): boolean {
  return value == 'true' || value === true;
}

export function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function extractToken(headers: any) {
  let token: string =
    headers && headers.authorization ? headers.authorization : '';
  token = token.replace(/Bearer\s+/gm, '');
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

export const bdNumberPrefixValidator = (prefix: any) => {
  try {
    const regex = /^01[3-9]$/g;
    const pf = prefix.match(regex);
    if (pf != null) {
      return prefix;
    } else {
      return 'Invalid Prefix';
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
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
    const randomNumber = (Math.random() * 16) | 0;
    const value = char == 'x' ? randomNumber : (randomNumber & 0x3) | 0x8;
    return value.toString(16).toUpperCase();
  });
}

export function CapitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function DashedToClassName(string: string) {
  return Pluralize.singular(
    string
      .split('-')
      .map((o) => CapitalizeFirstLetter(o))
      .join('')
  );
}

export function cleanObject(obj) {
  for (var propName in obj) {
    if (
      // TODO  commenting below line to assign users activeCart null
      // obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName];
    }
  }
  return obj;
}

export function getEntityNameFromReq(req: any) {
  const serviceDashedName = CapitalizeFirstLetter(
    Pluralize.singular(req.path.split('/')[3])
  );
  return DashedToClassName(serviceDashedName);
}

export const BeforeDate = (date: Date) => Between(subYears(date, 100), date);
export const AfterDate = (date: Date) => Between(date, addYears(date, 100));

export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function ToBoolean(): (target: any, key: string) => void {
  return Transform((value: any) => value === 'true');
}

export async function selectArrayBuilder(
  entityAlias: string,
  select: (string | number | symbol)[]
) {
  let newSelectArray = [];
  newSelectArray.push(entityAlias + '.id');
  newSelectArray.push(entityAlias + '.updatedAt');
  await asyncForEach(select, async (selectString: string) => {
    newSelectArray.push(entityAlias + '.' + selectString);
  });
  return newSelectArray;
}

export async function relationBuilder(
  queryBuilder: any,
  entityAlias: string,
  relationArray: string[]
) {
  await asyncForEach(relationArray, async (relation: string) => {
    const nestedRelation = relation.split('.');

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

export function gen6digitOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function isUUID(string: string) {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(string);
}

export function convertToBool(value: any): boolean {
  return value === 'true' || true;
}
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

export function excludeArray(array: any[], exclude: any[]) {
  return array.filter((item) => !exclude.includes(item));
}

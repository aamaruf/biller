import { getConnection } from "typeorm";

export const getNextValFromSequence = async (sequenceName: string, entityProperty: string) => {
    // const globalSettings = await getConnection().getRepository(GlobalSetting).findOne();
    // console.log("🚀🚀🚀🚀🚀 ~ file: db.util.ts ~ line 7 ~ globalSettings", globalSettings)
    // const codeLength = globalSettings[entityProperty];
    let value
    try {
        value = await getConnection().query(`select nextval('${sequenceName}') as code`);
        console.log("🚀🚀🚀🚀🚀 ~ file: db.util.ts ~ line 12 ~ value", value)
    } catch (error) {
        console.log("🚀🚀🚀🚀🚀 ~ file: db.util.ts ~ line 12 ~ error", error)
    }
    const code = value && value.length ? value[0].code : null;
    // const val = GenerateKeyOrCodeWithPrefix('0', codeLength, code)
    return code
}

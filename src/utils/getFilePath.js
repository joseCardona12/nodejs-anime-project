import path from "path";
const getFilePath = (nameFile,dirname)=> path.join(dirname, `../../data/${nameFile}.json`);
export default getFilePath;
import {fileURLToPath} from "url";
import path from "path";
import getFilePath from "../utils/getFilePath.js";

const __filname = fileURLToPath(import.meta.url); // Get the path of the current file
const __dirname = path.dirname(__filname); // Get the path of the current director

export const dataFilePathAnimes = getFilePath("animes", __dirname);
export const dataFilePathStudies = getFilePath("studies", __dirname);
export const dataFilePathDirectors = getFilePath("directors", __dirname);
export const dataFilePathCharacters = getFilePath("characters", __dirname);
import {promises as fs} from "fs";

export const readFileFs = async(pathFile) =>{
    try{
        const data = await fs.readFile(pathFile, "utf-8");
        return JSON.parse(data);
    }catch(err){
        console.error({message: "Error reading file. Function readFile", err});
    }
}

export const writeFileFs = async(pathFile, data) =>{
    try{
        await fs.writeFile(pathFile, JSON.stringify(data,null,2), "utf-8");
        console.log("File written successfully");
    }catch(err){
        console.error({message: "Error writing file. Function writeFile", err});
    }
}
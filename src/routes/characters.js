import { Router } from "express";
import { dataFilePathCharacters } from "./paths.js";
import { readFileFs, writeFileFs } from "../utils/readWriteFs.js";
const router = Router();

router.get("/", async(req,res)=>{
    try{
        const getCharacters = await readFileFs(dataFilePathCharacters);
        res.json({characters: getCharacters});
    }catch(error){
        console.error({message: "Error reading file. Method get - Api characters", error});
    }
})
router.get("/:id", async(req,res)=>{
    try{
        const getCharacters = await readFileFs(dataFilePathCharacters);
        const foundCharacter = getCharacters.find(character=>character.id === parseInt(req.params.id))
        if(!foundCharacter){
            res.status(404).json("Character not found");
            return;
        }
        res.json({character: foundCharacter});    
    }catch(error){
        console.error({message: "Error reading file. Method get by id - Api characters", error});
    }
})
router.post("/", async(req,res)=>{
    try{
        const getCharacters = await readFileFs(dataFilePathCharacters);
        const newCharacter = {
            id: getCharacters.length + 1,
            name: req.body.name
        }
        getCharacters.push(newCharacter);
        await writeFileFs(dataFilePathCharacters,getCharacters);
        res.status(201).json({message: "Character created successfully", character: newCharacter});

    }catch(error){
        console.error({message: "Error reading file. Method post - Api characters", error});
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const getCharacters = await readFileFs(dataFilePathCharacters);
        const foundCharacterIndex = getCharacters.findIndex(character=>character.id === parseInt(req.params.id));
        if(foundCharacterIndex === -1){
            res.status(404).json("Character not found");
            return;
        }
        const updateCharacter = {
            ...getCharacters[foundCharacterIndex],
            name: req.body.name
        }
        getCharacters[foundCharacterIndex] = updateCharacter;
        await writeFileFs(dataFilePathCharacters, getCharacters);
        res.json({message: "Character updated", character: updateCharacter});

    }catch(error){
        console.error({message: "Error reading file. Method put - Api characters", error});
    }
})
router.delete("/:id", async(req,res)=>{
    try{
        const getCharacters = await readFileFs(dataFilePathCharacters);
        const filterCharacters = getCharacters.filter(character=>character.id !== parseInt(req.params.id));
        if(!filterCharacters){
            res.status(404).json("Character not found");
            return;
        }
        await writeFileFs(dataFilePathCharacters,filterCharacters);
        res.status(200).json({message: "Character deleted"});
    }catch(error){
        console.error({message: "Error reading file. Method delete - Api characters", error});
    }
})

export default router;
import { Router } from "express";
import { readFileFs, writeFileFs } from "../utils/readWriteFs.js";
import { dataFilePathDirectors } from "./paths.js";

const router = Router();
router.get("/", async(req,res)=>{
    try{
        const getDirectors = await readFileFs(dataFilePathDirectors);
        res.json({directors:getDirectors});
    }catch(error){
        console.error({message: "Error reading file. Method get - Api directors", error});
    }
});
router.get("/:id", async(req,res)=>{
    try{
        const getDirectors = await readFileFs(dataFilePathDirectors);
        const foundDirector = getDirectors.find(director=>director.id === parseInt(req.params.id));
        if(!foundDirector){
            res.status(404).json("Director not found");
            return;
        }
        res.json({director: foundDirector});

    }catch(error){
        console.error({message: "Error reading file. Method get by id - Api directors", error});
    }
})
router.post("/", async(req,res)=>{
    try{
        const getDirectors = await readFileFs(dataFilePathDirectors);
        const newDirector = {
            id: getDirectors.length +1,
            name: req.body.name
        }
        getDirectors.push(newDirector);
        await writeFileFs(dataFilePathDirectors,getDirectors);
        res.status(201).json({message: "Director created successfully", director: newDirector});
        
    }catch(error){
        console.error({message: "Error reading file. Method post - Api directors", error});
    }
})
router.put("/:id", async(req,res)=>{
    try{
        const getDirectors = await readFileFs(dataFilePathDirectors);
        const foundDirectorIndex = getDirectors.findIndex(director=> director.id === parseInt(req.params.id));
        if(foundDirectorIndex === -1){
            res.status(404).json("Director not found");
            return;
        }
        const updateDirector = {
            ...getDirectors[foundDirectorIndex],
            name: req.body.name
        } 
        getDirectors[foundDirectorIndex] = updateDirector;
        await writeFileFs(dataFilePathDirectors, getDirectors);
        res.json({message: "Director updated", director: updateDirector});

    }catch(error){
        console.error({message: "Error reading file. Method put - Api directors", error});
    }
})
router.delete("/:id", async(req,res)=>{
    try{
        const getDirectors = await readFileFs(dataFilePathDirectors);
        const filterDirectors = getDirectors.filter(director=> director.id !== parseInt(req.params.id));
        if(!filterDirectors){
            res.status(404).json("Director not found");
            return
        }
        await writeFileFs(dataFilePathDirectors,filterDirectors);
        res.status(200).json({message: "Director deleted successfully"});

    }catch(error){
        console.error({message: "Error reading file. Method delete - Api directors", error});
    }
})
export default router;
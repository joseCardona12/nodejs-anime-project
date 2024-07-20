import { readFileFs, writeFileFs } from "../utils/readWriteFs.js";
import { Router } from "express";
import { dataFilePathStudies } from "./paths.js";

const router = Router();
router.get("/", async(req,res)=>{
    try{
        const getStudies = await readFileFs(dataFilePathStudies);
        res.json({studies: getStudies});
    }catch(error){
        console.error({message: "Error reading file. Method get - Api studies", error});
    }
})

router.get("/:id", async(req,res)=>{
    const getStudies = await readFileFs(dataFilePathStudies);
    const foundStudy = getStudies.find(studie=>studie.id === parseInt(req.params.id));
    if(!foundStudy){
        res.status(404).json("Study not found");
        return;        
    }
    res.json({study: foundStudy});
})
router.post("/", async(req,res)=>{
    try{
        const getStudies = await readFileFs(dataFilePathStudies);
        const newStudies = {
            id: getStudies.length + 1,
            name: req.body.name
        }
        getStudies.push(newStudies);
        await writeFileFs(dataFilePathStudies,getStudies);
        res.status(201).json({message: "Study created", study: newStudies});

    }catch(error){
        console.error({message: "Error reading file. Method post - Api studies", error});
    }
})
router.put("/:id", async(req,res)=>{
    try{
        const getStudies = await readFileFs(dataFilePathStudies);
        const foundStudyIndex = getStudies.findIndex(studie=>studie.id === parseInt(req.params.id));
        if(foundStudyIndex === -1){
            res.status(404).json("Study not found");
            return;
        }
        const updateStudies ={
            ...getStudies[foundStudyIndex],
            name: req.body.name
        }
        getStudies[foundStudyIndex] = updateStudies;
        await writeFileFs(dataFilePathStudies,getStudies);
        res.status(200).json({message: "Study updated"});

    }catch(error){
        console.error({message: "Error reading file. Method put - Api studies", error});
    }
})
router.delete("/:id", async(req,res)=>{
    try{
        const getStudies = await readFileFs(dataFilePathStudies);
        const filterStudies = getStudies.filter(studie=>studie.id !== parseInt(req.params.id));
        if(!filterStudies){
            res.status(404).json("Study not found");
            return;
        }
        await writeFileFs(dataFilePathStudies,filterStudies);
        res.status(200).json({message: "Study deleted"});

    }catch(error){
        console.error({message: "Error reading file. Method delete - Api studies", error});
    }
})

export default router;

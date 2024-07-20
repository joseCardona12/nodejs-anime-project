import { readFileFs, writeFileFs } from "../utils/readWriteFs.js";
import { Router } from "express";
import { dataFilePathAnimes } from "./paths.js";

const router = Router();
router.get("/", async(req,res)=>{ // Endpoint get animes
    try{
        const getAnimes = await readFileFs(dataFilePathAnimes);
        res.json({animes: getAnimes});
    }catch(err){
        console.log({message: "Error reading file. Method get", err});
    }
})

router.get("/:id", async(req,res)=>{ // Endpoint get animes by id
    try{
        const getAnimes = await readFileFs(dataFilePathAnimes);
        const foundAnime = getAnimes.find(anime=>anime.id === parseInt(req.params.id));
        if(!foundAnime){
            res.status(404).json("Anime not found");
            return;
        }
        res.json({animes: foundAnime});

    }catch(error){
        console.log({message: "Error reading file. Method get by id", error});
    }
})

router.post("/", async(req,res)=>{ // Endpoint post animes
    try{
        const getAnimes = await readFileFs(dataFilePathAnimes);
        const newAnime = {
            id: getAnimes.length + 1,
            title: req.body.title,
            genre: req.body.genre,
            studioId: req.body.studioId
        }
        getAnimes.push(newAnime);
        await writeFileFs(dataFilePathAnimes, getAnimes);
        res.status(201).json({message: "Anime created successfully,", anime: newAnime});

    }catch(err){
        console.log({message: "Error reading file. Method post", err});
    }
})

router.put("/:id", async(req,res)=>{
    try{
        const getAnimes = await readFileFs(dataFilePathAnimes);
        const foundAnimeIndex = getAnimes.findIndex(anime=>anime.id === parseInt(req.params.id));
        if(foundAnimeIndex === -1){
            res.status(404).json("Anime not found");
            return;
        }
        const updateAnime = {
            ...getAnimes[foundAnimeIndex],
            title: req.body.title,
            genre: req.body.genre,
            studioId: req.body.studioId
        }
        getAnimes[foundAnimeIndex] = updateAnime;
        await writeFileFs(dataFilePathAnimes, getAnimes);
        res.status(200).json({message: "Anime updated successfully", anime: updateAnime});
    }catch(err){
        console.error({message: "Error reading file. Method put", err});
    }
})

router.delete("/:id", async(req,res)=>{
    try{
        const getAnimes = await readFileFs(dataFilePathAnimes);
        const filterAnimes = getAnimes.filter(anime=>anime.id !== parseInt(req.params.id));
        if(!filterAnimes){
            res.status(404).json("Anime not found");
            return;
        }
        await writeFileFs(dataFilePathAnimes,filterAnimes);
        res.status(200).json({message: "Anime deleted successfully"});
    }catch(error){
        console.error({message: "Error reading file. Method delete", error});
    }
})

export default router;

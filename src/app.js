import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import routerAnimes from "./routes/animes.js";
import routerStudies from "./routes/studies.js";
import routerDirectors from "./routes/directors.js";
import routerCharacters from "./routes/characters.js"
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json()); // for parsing application/json
app.use(cors());
app.use("/animes", routerAnimes);
app.use("/studies", routerStudies);
app.use("/directors", routerDirectors);
app.use("/characters", routerCharacters);
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



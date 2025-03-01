import express from "express";
import { initStorage } from "./utils/init-storage";
import { getCharacterRoutes } from "./routes/character-route";

const PORT = process.env.PORT || 3000;

const app = express();

const characterStorage = initStorage(`${__dirname}/characters`);

app.use(express.json());

app.use("/character", getCharacterRoutes(characterStorage));

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

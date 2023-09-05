import express, { json } from "express";
import cors from "cors";
import { notesRouter } from "./routes/notesRoutes.js";
const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(json());
app.use(cors());

app.use('/notes', notesRouter)

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

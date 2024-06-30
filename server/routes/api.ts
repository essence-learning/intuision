import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";

import assistantRoutes from "./assistantRoutes";

import { generateHaiku } from "../services/textService";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from the API!" });
});

router.get("/book/:bookName", (req: Request, res: Response) => {
  const bookName = req.params.bookName;
  const filePath = path.join(__dirname, "../books", `${bookName}.json`);

  console.log(`${bookName} at ${filePath}`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("Book not found");
    }

    const foundBook = JSON.parse(data);
    res.json(foundBook);
  });
});

router.get("/haiku", async (req: Request, res: Response) => {
  try {
    const haiku = await generateHaiku();
    res.json({ haiku });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate haiku" });
  }
});

router.use("/assistant", assistantRoutes);

export default router;

import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";


import { bundleMDX } from 'mdx-bundler';

import assistantRoutes from "./assistantRoutes";
import { generateHaiku } from "../services/textService";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello from the API!" });
});

router.get("/book/:bookName", (req: Request, res: Response) => {
  const bookName = req.params.bookName;
  const filePath = path.join(__dirname, `../books/${bookName}/`, "toc.json");

  console.log(`${bookName} at ${filePath}`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).send("Book not found");
    }

    const foundBook = JSON.parse(data);
    res.json(foundBook);
  });
});

const booksDirectory = path.resolve(__dirname, '../books');
console.log(booksDirectory);
router.use('/books', express.static(booksDirectory));

router.get('/article/:bookName/:fileName', async (req, res) => {
  const { bookName, fileName } = req.params;
  const filePath = path.join(__dirname, `../books/${bookName}/content/`, `${fileName}.mdx`);
  if (fs.existsSync(filePath)) {
    let mdxContent = fs.readFileSync(filePath, 'utf-8');
    
    const baseURL = `/api/books/${bookName}/media/`;
    mdxContent = mdxContent.replace(/__MEDIA_URL__/g, baseURL);

    try {
      const { code, frontmatter } = await bundleMDX({ source: mdxContent });
      res.json({ code, frontmatter });
    } catch (error) {
      console.error('Error processing MDX file:', error);
      res.status(500).json({ error: 'Error processing MDX file' });
    }
  } else {
    res.status(404).json({ error: 'MDX file not found' });
  }
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

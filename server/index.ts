import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("please lebron");
});

app.get("/lebron", (req: Request, res: Response) => {
  res.send("put your balls in my mouth");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

import express, { Request, Response } from "express";
import * as mongoose from "mongoose";
import User, { IUser } from "./models/User";
import path from 'path';
import fs from 'fs';

const mongoURI = process.env.MONGO_CONNECTION_URI || "";

// MongoDB Connection
// mongoose
//   .connect(mongoURI, {})
//   .then(() => {
//     console.log("MongoDB Connected");

//     //test adding user
//     /*
//     async function createUser() {
//       const user: IUser = new User({
//         name: "John Doe",
//         email: "john.doe@example.com",
//         age: 30,
//       });

//       try {
//         const savedUser = await user.save();
//         console.log("User saved:", savedUser);
//       } catch (error) {
//         console.error("Error saving user:", error);
//       }
//     }

//     createUser(); */
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// Express Server

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("please lebron");
});

app.get("/lebron", (req: Request, res: Response) => {
  res.send("put your balls in my mouth");
});

app.get("/book/:bookName", (req: Request, res: Response) => {
  const bookName = req.params.bookName;
  const filePath = path.join(__dirname, 'books', '${bookName}.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('Book not found');
    }

    const foundBook = JSON.parse(data);
    res.json(foundBook);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

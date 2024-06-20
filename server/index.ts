import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

import express, { Request, Response } from "express";
import * as mongoose from "mongoose";
import User, { IUser } from "./models/User";
import path from "path";
import fs from "fs";

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

app.get("/api/book/:bookName", (req: Request, res: Response) => {
  res.json({
    title: "AP Physics 1",
    sections: [
      {
        id: 1,
        title: "Kinematics",
        subsections: [
          {
            id: 11,
            title: "Motion in One Dimension",
            subsections: [
              { id: 111, title: "Position, Velocity, and Acceleration" },
              { id: 112, title: "Graphs of Motion" },
              { id: 113, title: "Equations of Motion" },
            ],
          },
          {
            id: 12,
            title: "Motion in Two Dimensions",
            subsections: [
              { id: 121, title: "Projectile Motion" },
              { id: 122, title: "Relative Motion" },
            ],
          },
          {
            id: 13,
            title: "Vectors",
            subsections: [
              { id: 131, title: "Vector Addition" },
              { id: 132, title: "Vector Components" },
              { id: 133, title: "Vector Resolution" },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Dynamics",
        subsections: [
          {
            id: 21,
            title: "Newton's Laws",
            subsections: [
              { id: 211, title: "First Law" },
              { id: 212, title: "Second Law" },
              { id: 213, title: "Third Law" },
            ],
          },
          {
            id: 22,
            title: "Friction",
            subsections: [
              { id: 221, title: "Static Friction" },
              { id: 222, title: "Kinetic Friction" },
              { id: 223, title: "Drag" },
            ],
          },
          {
            id: 23,
            title: "Circular Motion",
            subsections: [
              { id: 231, title: "Centripetal Force" },
              { id: 232, title: "Banked Curves" },
              { id: 233, title: "Conical Pendulum" },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Energy",
        subsections: [
          {
            id: 31,
            title: "Work and Energy",
            subsections: [
              { id: 311, title: "Work" },
              { id: 312, title: "Kinetic Energy" },
              { id: 313, title: "Potential Energy" },
            ],
          },
          {
            id: 32,
            title: "Conservation of Energy",
            subsections: [
              { id: 321, title: "Mechanical Energy" },
              { id: 322, title: "Conservation of Mechanical Energy" },
              { id: 323, title: "Energy Diagrams" },
            ],
          },
          {
            id: 33,
            title: "Power",
            subsections: [
              { id: 331, title: "Power" },
              { id: 332, title: "Efficiency" },
            ],
          },
        ],
      },
      {
        id: 4,
        title: "Momentum",
        subsections: [
          {
            id: 41,
            title: "Impulse and Momentum",
            subsections: [
              { id: 411, title: "Impulse" },
              { id: 412, title: "Momentum" },
              { id: 413, title: "Impulse-Momentum Theorem" },
            ],
          },
          {
            id: 42,
            title: "Conservation of Momentum",
            subsections: [
              { id: 421, title: "Isolated Systems" },
              { id: 422, title: "Collisions" },
              { id: 423, title: "Center of Mass" },
            ],
          },
        ],
      },
    ],
  });
  // const bookName = req.params.bookName;
  // const filePath = path.join(__dirname, "books", `${bookName}.json`);

  // console.log(`${bookName} at ${filePath}`);

  // fs.readFile(filePath, "utf8", (err, data) => {
  //   if (err) {
  //     return res.status(404).send("Book not found");
  //   }

  //   const foundBook = JSON.parse(data);
  //   res.json(foundBook);
  // });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

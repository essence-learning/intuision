import dotenv from "dotenv";
import express, { Request, Response } from "express";
import * as mongoose from "mongoose";
import User, { IUser } from "./models/User";
import apiRoutes from "./routes/api";
import Anim, { IAnim } from "./models/Anim";

// Load environment variables from .env file
dotenv.config();

const mongoURI = process.env.MONGO_CONNECTION_URI || "";

// MongoDB Connection
mongoose
  .connect(mongoURI, {})
  .then(async () => {
    console.log("MongoDB Connected");

    // Create a random animation
    const anim = new Anim({
      name: "Test Animation",
      caption: "Test Caption",
      blockId: "test-block-id",
      code:
        '<color attach="background" args={["black"]} />\n' +
        "          <ambientLight />\n" +
        "          <pointLight position={[10, 10, 10]} />\n" +
        "          <mesh ref={ref}>\n" +
        "            <boxGeometry args={[1, 1, 1]} />\n" +
        '            <meshStandardMaterial color="hotpink" />\n' +
        "          </mesh>\n" +
        "          <OrbitControls />",
    });
    await anim.save();
  })
  .catch((err) => {
    console.error(err);
  });

// Express Server

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("please lebron");
});

app.get("/lebron", (req: Request, res: Response) => {
  res.send("put your balls in my mouth");
});

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

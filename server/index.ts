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

    //     // Create a random animation
    //     const anim = new Anim({
    //       name: "Test Animation",
    //       caption: "Test Caption",
    //       blockId: "test-block-id-12343132",
    //       code: `const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // camera.position.z = 5;

    // const ambientLight = new THREE.AmbientLight(0x404040);
    // scene.add(ambientLight);

    // const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    // pointLight.position.set(0, 0, 10);
    // scene.add(pointLight);

    // function animate() {
    //   requestAnimationFrame(animate);
    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;
    // }
    // animate();
    // `,
    //     });
    //     await anim.save();
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

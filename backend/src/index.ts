import express from "express";

import routes from "./routes";
import { startMongoDB } from "./db/mongodb";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);

startMongoDB();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

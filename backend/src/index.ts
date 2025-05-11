import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { openApiDocument } from "#swagger";

import { startMongoDB } from "./db/mongodb";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

startMongoDB();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

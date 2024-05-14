import mongoose from "mongoose";
import "dotenv/config";
import envsConfig from "./conf/envConf";
import app from "./app";
import Event from "./models/Event";

import data from "./data/data.json";

mongoose.set("strictQuery", true);
if (!envsConfig.dbHost) {
  console.error("Database URL must be specified in .env");
  process.exit(1);
}

mongoose
  .connect(envsConfig.dbHost)
  .then(async () => {
    app.listen(envsConfig.port, () => {
      console.log(`Server running. Use our API on port: ${envsConfig.port}`);
    });

  })
  .catch((error) => {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  });

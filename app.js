const express = require("express");
const config = require("./config/app");
const route = require("./routes/api");
const logger = require("./middlewares/logger");

const app = express();

app.use(logger);
app.use(express.json());

route.healthCheck(app); // health check route
route.mountApiV1(app);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

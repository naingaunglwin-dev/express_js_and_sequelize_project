const express = require("express");
const config = require("./config/app");
const route = require("./routes/api");

const app = express();

route.healthCheck(app); // health check route
route.mountApiV1(app);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

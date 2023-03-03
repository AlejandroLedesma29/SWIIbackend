const EXPRESS = require("express");
const MONGOOSE = require("mongoose");
const ROUTES_APP = require("./src/routes");
require("dotenv").config();
const APP = EXPRESS();

APP.listen(process.env.PORT_PC, () => console.log(`Connect for port ${process.env.PORT_PC}`));

MONGOOSE.set('strictQuery', false);

MONGOOSE.connect(process.env.STRING_CONNECTION,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
  .then(() => console.log("Success connection with mongoDB"))
  .catch((err) => console.error(err));

APP.use(EXPRESS.json());

ROUTES_APP(APP);

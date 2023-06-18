const express = require("express");
const colors = require("colors");
require("dotenv").config();
const cors = require("cors");
const schema = require("./schema/schema");
const port = process.env.PORT || 5000;
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("../server/config/db");

const app = express();

//connect to dadabase
connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server running on port ${port}`.yellow));

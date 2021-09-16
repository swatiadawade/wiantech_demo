const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongooes = require("mongoose");
const cors = require("cors");
dotenv.config();

//Connect DB
mongooes.connect(process.env.DB_CONNECT, { useNewUrlParser: true,  useUnifiedTopology: true }, (err, client) => {
    if (err) {
        return console.log(err);
    }
    console.log("Connected to DB");
});

//Import Routes
const listingRoutes = require("./routes/listing");
const userRoutes = require("./routes/user");
//Middleware
app.use(express.json());
app.use(cors());

//route Middleware
app.use("/api/listings", listingRoutes);
app.use("/api/user", userRoutes);
app.listen('3000', () => console.log("Server Up and running on port 3000"));
require("dotenv").config();
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200
};

//cors and config
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.options(corsOptions, cors());

//routes
require("./routes/tech.router")(app);
require("./routes/auth.routes")(app);

//database
const db = require("./models");
db.mongoose.connect(db.url).then(()=>{
    console.log("Connection to Database established");
}).catch(err => {
    console.log("Something went wrong while connecting to the db...");
    console.log(err);
    process.exit();
});

//server start
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});


require("dotenv").config();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_URL;
db.tech = require("./tech.model")(mongoose);
db.user = require("./user.model")(mongoose);

module.exports = db;
const { checkToken } = require("../middlewares/auth.token");

module.exports = app => {
    const auth = require("../controllers/auth.controller");
    var router = require("express").Router();

    router.post("/", auth.login );

    router.get("/validateToken", auth.validateToken);

    app.use("/api/login", router);
};
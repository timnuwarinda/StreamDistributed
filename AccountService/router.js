const express = require('express')
const {registerFunction,login,subscribe,checkSubscribeRest} = require("./AccountService")
const {general} = require("./errorHandler")
const {saveMiddleware} = require("./middleware");

const accountRouter = express.Router();


accountRouter.post("/register",registerFunction);
accountRouter.post("/login",login);
accountRouter.post("/subscribe",subscribe);
accountRouter.post("/checkSubscribe",checkSubscribeRest);

module.exports = accountRouter;
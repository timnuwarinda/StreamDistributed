const express = require('express')
const accountRouter = require("./router")
const {general} = require("./errorHandler")
const cors = require('cors')
const listener = require('./messagingService');

const app = express()

listener().catch(console.error);

const port = 3333;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/account",accountRouter);
app.use(general);

app.listen(port, () => {
    console.log("application is running on port ", +port);
})
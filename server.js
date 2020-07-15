const express = require("express");

const carRouter = require("./cars/carRouter");

const server = express();

server.use(express.json());

server.use("/api/cars", carRouter);

module.exports = server;
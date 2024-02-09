import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import apiRegister from "./api-register.js";

const databaseURL =
  "mongodb+srv://damircoco16:Damirxxcoco123@cluster0.tmcj9oc.mongodb.net/galaemporium";

const server = express();
const port = 3000;

server.use(express.json());
server.use(express.static("../frontend"));
mongoose.connect(databaseURL);

server.use(
  session({
    secret: "ditt_hemliga_tangent", // en hemlig nyckel för att signera session-cookie
    resave: false, // undviker att spara sessionen om den inte ändras
    saveUninitialized: true, // spara en ny session som inte har blivit initialiserad
    cookie: { secure: false }, // cookie-inställningar, secure bör vara true i produktion med HTTPS
  })
);

apiRegister(server);

server.listen(port, () => {
  console.log("Server is listening");
});

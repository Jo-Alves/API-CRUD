const express = require("express");
const cors = require("cors");
const routeIndex = require("./app/controller/routes/route");
const dbConnection = require("./db/connectionDB");

dbConnection.authenticate()
    .then(() => {
        console.log("Conexão Feita com sucesso!")
    })
    .catch(error => {
        console.log(error);
    })

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routeIndex);

app.listen(3000, () => {
    console.log("Rodando a API");
})
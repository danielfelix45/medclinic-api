import express from "express";
import "dotenv/config";
import { AppDataSource } from "./database/data-source";

const app = express();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida.");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Erro ao conectar com o banco de dados: ", err);
  });

import express from "express";
import "dotenv/config";
import { AppDataSource } from "./database/data-source";
import { authRoutes } from "./routes/auth.routes";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

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

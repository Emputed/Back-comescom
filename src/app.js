import express from "express";
import morgan from "morgan";

//Import Routes 
import usuariosRoutes from "./routes/usuarios.routes.js"

const app = express(); //aplicacion creada con express

//Settings
app.set("port", 4000);

//Middleware
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/users", usuariosRoutes);

export default app;
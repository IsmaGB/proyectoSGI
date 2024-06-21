const express = require('express');
const morgan= require("morgan")
const router=require("../router/product.router")
const cors = require('cors');
const app = express();

app.use(cors());
"Para ver las consultas HTTP"
app.use(morgan("dev"))
// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
res.send('¡Hola, Ismael!');
});
app.use("/api/v1", router)
module.exports=app;


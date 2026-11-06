import express, { type Request, type Response } from "express"; 
import swaggerRouter from "./routes/swagger.router.js";
import cors from "cors";
import productRouter from './routes/product.routes.js';
import customerRoutes from './routes/customer.routes.js';
import saleRoutes from './routes/sale.routes.js';

const port = process.env.PORT; 


const app = express();

// Middlewares 
app.use(express.json());
app.use(cors())

// Rutas de la API
app.use("/api/docs", swaggerRouter) 

app.use('/api', productRouter);

app.use('/api', customerRoutes);

app.use('/api', saleRoutes);

// Ruta de prueba para verificar que el servidor está en línea
app.get("/", (req: Request, res: Response) => {
    /*#swagger.tags = ['Tests']*/
    res.json({
        status: "Server online",
        version: "1.0.0"
    });
});

app.listen(port, () => {
    console.log(`URL: http://localhost:${port}`);
});
import express from 'express';
import cors from 'cors';
import nocache from 'nocache';
import { dbConnection } from './config/database.config';
import { productRouter } from './routes/prodRoutes';

const app = express();
const port =  process.env.PORT || 3003;
app.use(cors());

app.use(nocache());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnection();
app.use(productRouter);
app.listen(port, () => {
    console.log(`Server Running on ${port}`);
  });
import express, {json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(router);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running in port: ${port}`));
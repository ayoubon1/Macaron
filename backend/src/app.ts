import express from 'express';
import dotenv from 'dotenv';
import { config } from './config';
import { Lieux } from './routes/lieux/lieux.route';
import { Arrondissements } from './routes/arrondissement/arrondissement.route';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();
const options: cors.CorsOptions = {
  origin: ["http://localhost:3000"],
};

const app = express();
app.use(cors(options));
app.use('/api', [Lieux, Arrondissements]);
mongoose.connect(process.env.MONGO_DB_CLUSTER as string);
app.get('/', function (req, res) {
  res.send(`Hello ${process.env.MONGO_DB_CLUSTER}`);
});

app.listen(config.PORT);

import express, { Request, Response, NextFunction } from 'express';
import { ArrondissementModel } from '../../models/arrondissement';

const Router = express.Router();

Router.get('/Arrondissement', async (req: Request, res: Response) => {
  res.status(200).json(await ArrondissementModel.find({}).exec());
});

Router.get('/Arrondissement/:zip', async (req: Request, res: Response) => {
  const codePostal = req.params.zip;
  res.status(200).json(
    await ArrondissementModel.find({
      'properties.c_arinsee': codePostal
    }).exec()
  );
});
export { Router as Arrondissements };

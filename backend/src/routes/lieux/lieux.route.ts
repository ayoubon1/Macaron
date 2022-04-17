import express, { Request, Response } from 'express';
import { LieuxModel } from '../../models/lieux';

const Router = express.Router();

Router.get('/lieux', async (req: Request, res: Response) => {
  res.status(200).json(await LieuxModel.find({}).exec());
});
Router.get('/lieux/:zip', async (req: Request, res: Response) => {
  const codePostal = req.params.zip;
  res.status(200).json(
    await LieuxModel.find({
      'properties.ardt_lieu': codePostal
    }).exec()
  );
});
export { Router as Lieux };

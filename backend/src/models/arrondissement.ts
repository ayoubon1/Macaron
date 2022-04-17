import mongoose from 'mongoose';
export interface IArrondissementGeometry {
  type: string;
  coordinates: number[][][];
}

export interface IArrondissementProperties {
  n_sq_co: number;
  perimetre: number;
  l_ar: string;
  surface: number;
  geom_x_y: number[];
  n_sq_ar: number;
  l_aroff: string;
  c_arinsee: number;
  c_ar: number;
}
const ArrondissemtnGeometry = new mongoose.Schema({
  type: [String],
  coordinates: { type: [[[Number]]] }
});
const ArrondissementProperties = new mongoose.Schema({
  n_sq_co: Number,
  perimetre: Number,
  l_ar: String,
  surface: Number,
  geom_x_y: [Number],
  n_sq_ar: Number,
  l_aroff: String,
  c_arinsee: Number,
  c_ar: Number
});
export const ArrondissementSchema = new mongoose.Schema(
  {
    id: { type: String },
    type: { type: String },
    geometry: { type: ArrondissemtnGeometry },
    properties: { type: ArrondissementProperties }
  },
  { collection: 'Arrondissement' }
);
export const ArrondissementModel = mongoose.model(
  'Arrondissement',
  ArrondissementSchema,
  'Arrondissement'
);

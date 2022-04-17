import mongoose from 'mongoose';
export class ILieuxGeometry {
  type!: string;
  coordinates!: number[];
}

export class ILieuxProperties {
  annee_tournage!: string;
  coord_y!: number;
  coord_x!: number;
  type_tournage!: string;
  nom_producteur!: string;
  geo_point_2d!: Array<number>;
  nom_tournage!: string;
  nom_realisateur!: string;
  date_fin!: string;
  adresse_lieu!: string;
  id_lieu!: string;
  date_debut!: string;
  ardt_lieu!: string;
}
const LieuxGeometry = new mongoose.Schema({
  type: [String],
  coordinates: { type: [Number] }
});
const LieuxProperties = new mongoose.Schema({
  annee_tournage: String,
  coord_y: Number,
  coord_x: Number,
  type_tournage: String,
  nom_producteur: String,
  geo_point_2d: [Number],
  nom_tournage: String,
  nom_realisateur: String,
  date_fin: String,
  adresse_lieu: String,
  id_lieu: String,
  date_debut: String,
  ardt_lieu: String
});
export const LieuxSchema = new mongoose.Schema(
  {
    id: { type: String },
    type: { type: String },
    geometry: { type: LieuxGeometry },
    properties: { type: LieuxProperties }
  },
  { collection: 'Lieux' }
);

export const LieuxModel = mongoose.model('Lieux', LieuxSchema, 'Lieux');

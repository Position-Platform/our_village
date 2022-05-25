export interface Count {
  count: number;
  rating: number;
}

export interface Pivot {
  idSousCategorie: number;
  idEtablissement: number;
}

export interface Batiment {
  id: number;
  nom: string;
  nombreNiveau: string;
  codeBatiment: string;
  longitude: string;
  latitude: string;
  image: string;
  indication: string;
  rue: string;
  ville: string;
  commune: string;
  quartier: string;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  idCommercial: number;
  idUser?: any;
}

export interface Pivot2 {
  idEtablissement: number;
  idSousCategorie: number;
}

export interface Categorie {
  id: number;
  nom: string;
  logourl: string;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  shortname: string;
  vues: number;
}

export interface SousCategory2 {
  id: number;
  nom: string;
  idcategorie: number;
  logourl?: any;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  pivot: Pivot2;
  categorie: Categorie;
}

export interface Pivot3 {
  idEtablissement: number;
  idCommodite: number;
}

export interface Commodite {
  id: number;
  nom: string;
  idTypeCommodite: number;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  pivot: Pivot3;
}

export interface Image {
  id: number;
  idEtablissement: number;
  imageUrl: string;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Horaire {
  id: number;
  idEtablissement: number;
  jour: string;
  plageHoraire: string;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  phone: string;
  fcmToken?: any;
  imageProfil?: any;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Commentaire {
  id: number;
  idUser: number;
  idEtablissement: number;
  commentaire: string;
  rating: number;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  user: User;
}

export interface User2 {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  phone: string;
  fcmToken?: any;
  imageProfil: string;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Commercial {
  id: number;
  idUser: number;
  numeroCni: number;
  numeroBadge: number;
  ville: string;
  quartier: string;
  actif: boolean;
  sexe: string;
  whatsapp: number;
  diplome: string;
  tailleTshirt: string;
  age: number;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  user: User2;
}

export interface Etablissement {
  id: number;
  nom: string;
  idBatiment: string;
  indicationAdresse?: any;
  codePostal?: any;
  siteInternet?: any;
  idCommercial: string;
  idManager?: any;
  etage: string;
  cover: string;
  vues: string;
  phone: string;
  whatsapp1: string;
  whatsapp2?: any;
  description?: any;
  osmId?: any;
  updated: boolean;
  revoir: string;
  valide: string;
  services: string;
  ameliorations?: any;
  avis: number;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  idUser?: any;
  logo?: any;
  isFavoris: boolean;
  moyenne: number;
  count: Count[];
  pivot: Pivot;
  batiment: Batiment;
  sous_categories: SousCategory2[];
  commodites: Commodite[];
  images: Image[];
  horaires: Horaire[];
  commentaires: Commentaire[];
  commercial: Commercial;
  manager?: any;
  days: number;
  opennow: boolean;
  distance: number;
}

export interface SousCategory {
  id: number;
  nom: string;
  idcategorie: number;
  logourl?: any;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  etablissements: Etablissement[];
}

export interface Data {
  id: number;
  nom: string;
  logourl: string;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  shortname: string;
  vues: number;
  sous_categories: SousCategory[];
  commodites: any[];
}

export interface Categorie {
  success: boolean;
  data: Data;
  message: string;
}

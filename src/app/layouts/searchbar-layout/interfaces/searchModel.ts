export interface Batiment {
  id: number;
  nom: string;
  nombreNiveau: string;
  codeBatiment: string;
  longitude: string;
  latitude: string;
  image: string;
  indication?: any;
  rue: string;
  ville: string;
  commune: string;
  quartier: string;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  idCommercial: number;
  idUser: number;
}

export interface Pivot {
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

export interface SousCategory {
  id: number;
  nom: string;
  idcategorie: number;
  logourl?: any;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  pivot: Pivot;
  categorie: Categorie;
}

export interface Pivot2 {
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
  pivot: Pivot2;
}

export interface Datum {
  id: number;
  nom: string;
  idBatiment: string;
  indicationAdresse?: any;
  codePostal: string;
  siteInternet: string;
  idCommercial: string;
  idManager?: any;
  etage: string;
  cover: string;
  vues: string;
  phone: string;
  whatsapp1: string;
  whatsapp2?: any;
  description?: any;
  osmId: string;
  updated: boolean;
  revoir: string;
  valide: string;
  services: string;
  ameliorations?: any;
  avis: number;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  idUser: number;
  logo?: any;
  isFavoris: boolean;
  moyenne: number;
  count: any[];
  opennow: boolean;
  batiment: Batiment;
  sous_categories: SousCategory[];
  commodites: Commodite[];
  images: any[];
  horaires: any[];
  commentaires: any[];
  commercial?: any;
  manager?: any;
}

export interface SearchModel {
  success: boolean;
  data: Datum[];
  message: string;
}

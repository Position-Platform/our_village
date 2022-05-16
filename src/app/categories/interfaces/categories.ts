export interface Categories {
  success: boolean;
  data: Datum[];
  message: string;
}

export interface SousCategory {
  id: number;
  nom: string;
  idcategorie: number;
  logourl?: any;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Pivot {
  idCategorie: number;
  idCommodite: number;
}

export interface TypeCommodite {
  id: number;
  nom: string;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
}

export interface Commodite {
  id: number;
  nom: string;
  idTypeCommodite: number;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  pivot: Pivot;
  type_commodite: TypeCommodite;
}

export interface Datum {
  id: number;
  nom: string;
  logourl: string;
  deleted_at?: any;
  created_at: Date;
  updated_at: Date;
  shortname: string;
  vues: number;
  sous_categories: SousCategory[];
  commodites: Commodite[];
}

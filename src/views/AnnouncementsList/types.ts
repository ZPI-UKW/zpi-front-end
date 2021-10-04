export interface AnnList {
  id: string;
  title: string;
  images: string[];
  costs: {
    day: number;
  };
  categoryId: string;
  location: string;
}

export interface QueryData {
  getAnnoucements: {
    id: string;
    title: string;
    images: string[];
    costs: {
      day: number;
    };
    categoryId: string;
    location: string;
  }[];
}

export interface QueryVars {
  categoryId: any;
  search: any;
}

export interface Params {
  categoryName: string;
}

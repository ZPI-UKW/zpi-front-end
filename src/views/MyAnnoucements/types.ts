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
  addedBy: string;
}

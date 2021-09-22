export interface RouteParams {
  adId: string;
}

export interface QueryData {
  getAnnoucement: {
    id: string;
    title: string;
    description: string;
    addedBy: {
      _id: string;
    };
    location: string;
    categoryId: {
      name: string;
      englishName: string;
    };
    phone: string;
    email: string;
    costs: {
      day: number;
      week: number;
      month: number;
    };
    images: string[];
  };
}

export interface QueryVars {
  id: string;
}

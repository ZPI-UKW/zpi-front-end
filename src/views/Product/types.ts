export interface RouteParams {
  adId: string;
}

export interface QueryData {
  getAnnoucement: {
    id: string;
    title: string;
    description: string;
    addedBy: {
      id: string;
      email: string;
      name: string;
      lastname: string;
      phonenumber: string;
    };
    location: string;
    categoryId: {
      id: string;
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

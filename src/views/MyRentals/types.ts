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
    reservationId?: string;
  }[];
}

export interface QueryVars {
  reservedBy: string;
}

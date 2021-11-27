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
    reservationId: string;
    startAt: string;
    endAt: string;
    condition: string;
  }[];
}

export interface QueryVars {
  reservedBy: string;
}

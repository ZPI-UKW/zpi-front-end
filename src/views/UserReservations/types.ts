export interface QueryData {
  getUserReservedAnnoucements: {
    id: string;
    agreement: string | null;
    annoucementId: {
      id: string;
      title: string;
      images: string[];
      costs: {
        day: number;
      };
      categoryId: string;
      location: string;
      startAt: string;
    }
  }[];
}

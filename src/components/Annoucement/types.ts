export interface AnnoucementProps {
  annoucement: {
    id: string;
    title: string;
    description: string;
    addedBy: {
      _id: string;
      name: string;
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

export interface SliderProps {
  images: string[];
}

export interface Category {
  _id: string;
  name: string;
  englishName: string;
}

export interface ICategoryContext {
  categories: Category[] | null;
  setCategories: (cat: Category[]) => void;
}

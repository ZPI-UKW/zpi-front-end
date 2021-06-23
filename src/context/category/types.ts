export interface Category {
  _id: string;
  name: string;
  englishName:
    | 'cars'
    | 'electronics'
    | 'tools'
    | 'fashion'
    | 'books'
    | 'sport'
    | 'music'
    | 'estate'
    | 'movies';
}

export interface ICategoryContext {
  categories: Category[] | null;
  setCategories: (cat: Category[]) => void;
}

type Variant = 'home' | 'rentals' | 'your';

export interface CardProps {
  _id: string;
  variant: Variant;
  title: string;
  images: string[];
  price: number;
  location: string;
  status?: string;
}

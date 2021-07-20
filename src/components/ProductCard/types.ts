type Variant = 'home' | 'rentals' | 'your';

export enum Status {
  reserved = 'zarezerwowane',
  free = 'wolne',
  issued = 'wydane',
}

export interface CardProps {
  _id: string;
  variant: Variant;
  title: string;
  images: string[];
  price: number;
  location: string;
  status?: Status;
}

export interface CardMenuProps {
  variant: Variant;
  handleAnchor: (anchorEl: HTMLElement | null) => void;
  anchorEl: HTMLElement | null;
  _id: string;
  status: Status;
}

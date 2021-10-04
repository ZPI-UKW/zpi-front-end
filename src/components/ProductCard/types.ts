type Variant = 'home' | 'rentals' | 'your';

export enum Status {
  'not free' = 'zarezerwowane',
  free = 'wolne',
}

export interface CardProps {
  _id: string;
  variant: Variant;
  title: string;
  images: string[];
  price: number;
  location: string;
  status?: Status;
  categoryId: string;
  reservationId?: string;
  handleLoad?: () => void;
}

export interface CardMenuProps {
  variant: Variant;
  handleAnchor: (anchorEl: HTMLElement | null) => void;
  anchorEl: HTMLElement | null;
  _id: string;
  status: Status;
  reservationId?: string;
  handleLoad?: () => void;
}

export interface QueryDataDelete {}

export interface QueryVarsDelete {
  reservationId: string;
}

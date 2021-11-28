type Variant = 'home' | 'rentals' | 'your' | 'myReservedByUsers';

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
  startAt?: string;
  endAt?: string;
  condition?: string;
  handleLoad?: () => void;
  agreement?: string | null;
}

export interface CardMenuProps {
  variant: Variant;
  handleAnchor: (anchorEl: HTMLElement | null) => void;
  anchorEl: HTMLElement | null;
  _id: string;
  status: Status;
  reservationId: string;
  handleLoad?: () => void;
  startAt: string;
  endAt: string;
  condition: string;
}

export interface QueryDataCancel {}

export interface QueryVarsCancel {
  reservationId: string;
}

export interface QueryDataDelete {}

export interface QueryVarsDelete {
  annoucementId: string;
}

export interface AgreementProps {
  open: boolean;
  handleClose: () => void;
  reservationId: string
}

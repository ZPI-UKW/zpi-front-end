import { Moment } from 'moment';

export interface QueryData {
  createReservation: {
    id: string;
  };
}

export interface QueryVars {
  startAt: string;
  endAt: string;
  annoucementId: string;
}

export type Costs = {
  day: number;
  week: number;
  month: number;
};

export interface RentDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  costs: Costs;
  id: string;
}

export interface FormikProps {
  startDate: string;
  endDate: string;
}

export interface PricingProps {
  costs: Costs;
  startDate: Moment;
  endDate: Moment;
}

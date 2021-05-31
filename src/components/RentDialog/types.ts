import { Moment } from 'moment';

type Costs = {
  day: number;
  week: number;
  month: number;
};

export interface RentDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  costs: Costs;
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

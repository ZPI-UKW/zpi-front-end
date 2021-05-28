import { Typography } from '@material-ui/core';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { PricingProps } from './types';

const Pricing = ({ costs, startDate, endDate }: PricingProps) => {
  const [summary, setSummary] = useState({ days: 0, weeks: 0, months: 0, totalPrice: 0 });

  useEffect(() => {
    const end = moment(moment(endDate).format('DD-MM-yyyy'), 'DD-MM-yyyy');
    const start = moment(moment(startDate).format('DD-MM-yyyy'), 'DD-MM-yyyy');

    if (start.isBefore(end)) {
      const diff = end.diff(start, 'days');

      const months = Math.floor(diff / 30);
      const weeks = Math.floor((diff - months * 30) / 7);
      const days = diff - months * 30 - weeks * 7;

      const totalPrice = months * costs.month + weeks * costs.week + days * costs.day;
      setSummary({ days, weeks, months, totalPrice });
    }
  }, [startDate, endDate, costs]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Podsumowanie
      </Typography>
      <Typography variant="h4" component="p">
        {summary.months} x miesiąc (30 dni)
      </Typography>
      <Typography variant="h4" component="p">
        {summary.weeks} x tydzień (7 dni)
      </Typography>
      <Typography variant="h4" component="p">
        {summary.days} x dzień
      </Typography>
      <Typography variant="h4" gutterBottom>
        Łączny koszt
      </Typography>
      <Typography variant="h4" component="p">
        {summary.totalPrice} zł
      </Typography>
    </>
  );
};

export default Pricing;

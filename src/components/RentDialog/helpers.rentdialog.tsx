import moment from 'moment';

export const RentVariables = (startDate: moment.Moment, endDate: moment.Moment, id: string) => {
  return {
    variables: {
      startAt: moment(startDate).format('YYYY-MM-DD') + 'T00:00:00.000+00:00',
      endAt: moment(endDate).format('YYYY-MM-DD') + 'T00:00:00.000+00:00',
      annoucementId: id,
    },
  };
};

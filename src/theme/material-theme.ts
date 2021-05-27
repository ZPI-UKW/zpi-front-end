import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#374151' },
  },
  overrides: {
    MuiPickersToolbar: {
      '& svg': {
        fontSize: '2.4rem',
      },

      toolbar: {
        '& h3': {
          fontSize: '4.8rem',
        },
        '& *': {
          fontSize: '1.6rem',
        },
        '& h4': {
          fontSize: '3.6rem',
        },
      },
    },
    MuiPickerDTTabs: {
      scroller: {
        '& *': {
          fontSize: '4rem',
        },
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        '& p': {
          fontSize: '1.6rem',
        },
        '& svg': {
          fontSize: '2.4rem',
        },
      },
      daysHeader: {
        '& span': {
          fontSize: '1.5rem',
        },
      },
    },
    MuiPickersDay: {
      day: {
        '& p': {
          fontSize: '1.2rem',
        },
      },
    },
    MuiPickersClock: {
      clock: {
        '& span': {
          fontSize: '1.8rem',
        },
      },
    },
    MuiPickersYear: {
      root: {
        fontSize: '1.7rem',
      },
      yearSelected: {
        fontSize: '2.5rem',
      },
    },
  },
});

export default theme;

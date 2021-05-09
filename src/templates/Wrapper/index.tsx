import Header from '../Header';
import { ReactNode } from 'react';
import useStyles from './styles';

const Wrapper = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return (
    <main className={classes.wrapper}>
      <Header />
      {children}
    </main>
  );
};

export default Wrapper;

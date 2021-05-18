import { Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(11),
  },
}));

const ViewContainer = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <>{children}</>
    </Container>
  );
};

export default ViewContainer;

import { Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingInline: 0,
    paddingBlockEnd: theme.spacing(10),
  },
}));

const ViewContainer = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.root}>
      <>{children}</>
    </Container>
  );
};

export default ViewContainer;

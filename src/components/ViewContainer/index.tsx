import { Theme } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    paddingInline: theme.spacing(3),
    paddingBlockStart: theme.spacing(2),
    paddingBlockEnd: theme.spacing(10),
  },
}));

const ViewContainer = ({ children }: { children: React.ReactNode }) => {
  const classes = useStyles();

  return (
    <Container maxWidth={false} className={classes.root}>
      <>{children}</>
    </Container>
  );
};

export default ViewContainer;

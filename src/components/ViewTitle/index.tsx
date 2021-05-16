import { Typography } from '@material-ui/core';

const ViewTitle = ({ children }: { children: string }) => (
  <Typography variant="h3" component="h2">
    {children}
  </Typography>
);

export default ViewTitle;

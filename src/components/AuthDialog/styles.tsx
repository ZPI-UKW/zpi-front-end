import { DialogContent, Theme, withStyles } from '@material-ui/core';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledDialogContent = withStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    overflowX: 'hidden',
    transition: 'min-height 200ms ease-in-out, height 200ms ease-in-out',

    [theme.breakpoints.up('sm')]: {
      overflow: 'hidden',
    },

    '& *': {
      fontSize: '1.4rem',

      [theme.breakpoints.up('sm')]: {
        fontSize: '1.6rem',
      },
    },

    '& .MuiFormHelperText-root.Mui-error': {
      fontSize: '1rem',

      [theme.breakpoints.up('sm')]: {
        fontSize: '1.2rem',
      },
    },
  },
}))(DialogContent);

export const FormWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
`;

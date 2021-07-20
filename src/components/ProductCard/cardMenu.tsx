import { Menu, MenuItem } from '@material-ui/core';
import { CardMenuProps, Status } from './types';
import { useStyles } from './styles';
import { useHistory } from 'react-router-dom';

const CardMenu = ({ variant, handleAnchor, anchorEl, _id, status }: CardMenuProps) => {
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const history = useHistory();

  const handleClose = () => {
    handleAnchor(null);
  };

  const handleIconButton = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    history.push(`/edit-advertisement/${_id}`);
  };

  return (
    <Menu
      id="action-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      PaperProps={{
        className: classes.listElement,
      }}
    >
      {variant === 'rentals' ? <MenuItem onClick={handleClose}>Anuluj</MenuItem> : null}
      {variant === 'your' ? (
        <>
          <MenuItem onClick={handleClose}>Usuń</MenuItem>
          <MenuItem onClick={handleIconButton}>Edytuj</MenuItem>
          {status === Status.reserved ? (
            <MenuItem onClick={handleClose}>Zatwierdź rezerwację</MenuItem>
          ) : null}
          {status === Status.issued ? (
            <MenuItem onClick={handleClose}>Zakończ rezerwację</MenuItem>
          ) : null}
        </>
      ) : null}
    </Menu>
  );
};

export default CardMenu;

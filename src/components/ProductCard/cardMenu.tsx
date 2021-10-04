import { Menu, MenuItem } from '@material-ui/core';
import { CardMenuProps, QueryDataDelete, QueryVarsDelete, Status } from './types';
import { useStyles } from './styles';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import DataControl from '../DataControl';
import { CANCEL_RESERVATION } from '../../graphql/reservations';

const CardMenu = ({
  variant,
  handleAnchor,
  anchorEl,
  _id,
  status,
  reservationId,
  handleLoad,
}: CardMenuProps) => {
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const history = useHistory();

  const [CancelReservation, { error, data, loading, called }] = useMutation<
    QueryDataDelete,
    QueryVarsDelete
  >(CANCEL_RESERVATION);

  const handleClose = async () => handleAnchor(null);

  const handleCancel = async () => {
    if (reservationId !== undefined)
      await CancelReservation({
        variables: {
          reservationId,
        },
      });
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
      {variant === 'rentals' ? <MenuItem onClick={handleCancel}>Anuluj</MenuItem> : null}
      {variant === 'your' ? (
        <div>
          <MenuItem onClick={handleClose}>Usuń</MenuItem>
          <MenuItem onClick={handleIconButton}>Edytuj</MenuItem>
          {status === Status['not free'] ? (
            <MenuItem onClick={handleClose}>Zakończ</MenuItem>
          ) : null}
        </div>
      ) : null}
      <DataControl
        data={data}
        error={error}
        loading={loading}
        called={called}
        successMsg="Rezerwacja anulowana."
        onSuccess={() => {
          if (handleLoad !== undefined) {
            console.log(123);
            handleLoad();
          }
        }}
      />
    </Menu>
  );
};

export default CardMenu;

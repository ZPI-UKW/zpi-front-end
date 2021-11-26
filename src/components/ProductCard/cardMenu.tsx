import { Menu, MenuItem } from '@material-ui/core';
import {
  CardMenuProps,
  QueryDataCancel,
  QueryDataDelete,
  QueryVarsCancel,
  QueryVarsDelete
} from './types';
import { useStyles } from './styles';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import DataControl from '../DataControl';
import { CANCEL_RESERVATION } from '../../graphql/reservations';
import { DELETE_ANNOUCEMENT } from '../../graphql/annoucement';
import {
  PDFDownloadLink
} from '@react-pdf/renderer';
import PDFAgreement from '../PDF';

const CardMenu = ({
                    variant,
                    handleAnchor,
                    anchorEl,
                    _id,
                    status,
                    reservationId,
                    handleLoad
                  }: CardMenuProps) => {
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const history = useHistory();

  const [CancelReservation, { error, data, loading, called }] = useMutation<QueryDataCancel,
    QueryVarsCancel>(CANCEL_RESERVATION);

  const [
    DeleteAnnoucement,
    { error: deleteErr, data: deleteData, loading: deleteLoa, called: deleteCal }
  ] = useMutation<QueryDataDelete, QueryVarsDelete>(DELETE_ANNOUCEMENT);

  const handleClose = async () => handleAnchor(null);

  const handleCancel = async () => {
    if (reservationId !== undefined)
      await CancelReservation({
        variables: {
          reservationId
        }
      });
  };

  const handleDelete = async () => {
    if (_id !== undefined)
      await DeleteAnnoucement({
        variables: {
          annoucementId: _id
        }
      });
  };

  const handleIconButton = (e: React.MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    history.push(`/edit-advertisement/${_id}`);
  };

  return (
    <Menu
      id='action-menu'
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      PaperProps={{
        className: classes.listElement
      }}
    >
      {variant === 'rentals' ? <MenuItem onClick={handleCancel}>Anuluj</MenuItem> : null}
      {variant === 'rentals' ?
        <MenuItem><PDFDownloadLink document={<PDFAgreement />} fileName='umowa.pdf'>{({ blob, url, loading, error }) =>
          loading ? 'Ladowanie' : 'Pobierz umowę'
        }
        </PDFDownloadLink></MenuItem> : null}
      {variant === 'your' ? (
        <div>
          <MenuItem onClick={handleDelete}>Usuń</MenuItem>
          <MenuItem onClick={handleIconButton}>Edytuj</MenuItem>
        </div>
      ) : null}
      <DataControl
        data={data}
        error={error}
        loading={loading}
        called={called}
        successMsg='Rezerwacja anulowana.'
        onSuccess={() => {
          if (handleLoad !== undefined) handleLoad();
        }}
      />
      <DataControl
        data={deleteData}
        error={deleteErr}
        loading={deleteLoa}
        called={deleteCal}
        successMsg='Ogłoszenie usunięte.'
        onSuccess={() => {
          if (handleLoad !== undefined) handleLoad();
        }}
      />
    </Menu>
  );
};

export default CardMenu;

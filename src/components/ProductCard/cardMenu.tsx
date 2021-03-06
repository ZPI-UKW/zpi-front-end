import { Menu, MenuItem, Typography } from '@material-ui/core';
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
import { useState } from 'react';
import PDFAgreement from '../PDF';
import Agreement from './agreement';

const CardMenu = ({
  variant,
  handleAnchor,
  anchorEl,
  _id,
  status,
  reservationId,
  handleLoad,
  endAt,
  startAt,
  condition
}: CardMenuProps) => {
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const history = useHistory();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [CancelReservation, { error, data, loading, called }] = useMutation<QueryDataCancel,
    QueryVarsCancel>(CANCEL_RESERVATION);

  const [
    DeleteAnnoucement,
    { error: deleteErr, data: deleteData, loading: deleteLoa, called: deleteCal }
  ] = useMutation<QueryDataDelete, QueryVarsDelete>(DELETE_ANNOUCEMENT);

  const handleUploadClose = () => setIsUploadOpen(false);
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
    <>
      <Agreement open={isUploadOpen} handleClose={handleUploadClose} reservationId={reservationId} />
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
          <MenuItem>
            <PDFDownloadLink document={
              <PDFAgreement reservationId={reservationId} condition={condition} startAt={startAt} endAt={endAt} />
            } fileName='umowa.pdf' style={{color: 'black'}}>
              {({ blob, url, loading, error }) => loading ? 'Ladowanie' : 'Pobierz umow??'}
            </PDFDownloadLink>
          </MenuItem> : null}
        {variant === 'rentals' ? <MenuItem onClick={() => setIsUploadOpen(true)}>Prze??lij umow??</MenuItem> : null}
        {variant === 'your' ? (
          <div>
            <MenuItem onClick={handleDelete}>Usu??</MenuItem>
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
          successMsg='Og??oszenie usuni??te.'
          onSuccess={() => {
            if (handleLoad !== undefined) handleLoad();
          }}
        />
      </Menu>
    </>
  );
};

export default CardMenu;

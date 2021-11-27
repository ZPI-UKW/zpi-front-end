import React, { useState } from 'react';
import { Button, Card, CardContent, CardMedia, Grid, IconButton, Typography, Link as MuiLink } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CardProps, Status } from './types';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import clsx from 'clsx';
import { useStyles } from './styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMenu from './cardMenu';
import { useCategoryContextState } from '../../context/category/categoryContext';
import moment from 'moment';

const ProductCard = ({
  variant,
  title,
  price,
  images,
  location,
  _id,
  status,
  categoryId,
  reservationId,
  startAt,
  endAt,
  condition,
  handleLoad,
  agreement
}: CardProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { categories } = useCategoryContextState();

  const handleAnchor = (el: HTMLElement | null) => {
    setAnchorEl(el);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  if (categories === null) return null;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
      <Card elevation={8} className={clsx(classes.card, classes.moreBtn)}>
        {variant !== 'home' && variant !== 'myReservedByUsers' ? (
          <IconButton
            className={classes.editIcon}
            aria-label="Więcej"
            aria-controls="action-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        ) : null}
        <CardMedia component="div" image={images[0]} className={classes.media} />
          <CardContent>
            <Link
              to={`/category/${
                categories.find((el) => (el as any).id === categoryId)?.englishName
              }/${_id}`}
            >
              <Typography
                color="primary"
                className={classes.title}
                variant="h5"
                component="h2"
                noWrap
              >
                {title}
              </Typography>
            </Link>
            {variant === 'home' ? (
              <>
                <Typography
                  color="textSecondary"
                  className={clsx(classes.location, classes.marginTop)}
                  gutterBottom
                  variant="h6"
                  component="p"
                  noWrap
                >
                  <LocationOnIcon />
                  {location}
                </Typography>
                <Typography
                  className={classes.price}
                  color="primary"
                  variant="h4"
                  component="p"
                  noWrap
                >
                  od {price} zł
                </Typography>
              </>
            ) : null}
            {variant !== 'home' && variant !== 'myReservedByUsers' ? (
              <Typography
                className={classes.marginTop}
                color="textSecondary"
                variant="h6"
                component="p"
              >
                {variant === 'your' ? 'Status: ' : 'Wypożyczone od: '}
                <Typography color="primary" variant="h6" component="span" noWrap>
                  {variant === 'your' && status !== undefined
                    ? status
                    : moment(startAt).format('DD-MM-YY')}
                </Typography>
              </Typography>
            ) : null}
            {variant === 'myReservedByUsers' &&
            <>
              <Typography gutterBottom variant="h5" component="span" >Status umowy: {agreement ? 'przesłana - ' : 'nieprzesłana'}</Typography>
              {agreement && <MuiLink href={agreement} target="_blank"><Typography variant="h5" component="span">podgląd</Typography></MuiLink>}
            </>}
          </CardContent>
        <CardMenu
          anchorEl={anchorEl}
          handleAnchor={handleAnchor}
          variant={variant}
          _id={_id}
          status={status || Status.free}
          reservationId={reservationId || ''}
          handleLoad={handleLoad}
          startAt={startAt!}
          endAt={endAt!}
          condition={condition!}
        />
      </Card>
    </Grid>
  );
};

export default ProductCard;

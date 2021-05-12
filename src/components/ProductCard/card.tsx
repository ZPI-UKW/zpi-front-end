import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CardProps } from './types';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      position: 'relative',
    },
    editIcon: {
      position: 'absolute',
      top: '0.75rem',
      right: '0.75rem',
      background: theme.palette.grey[50],
    },
    title: {
      fontWeight: 700,
      fontSize: '1.8rem',
    },
    location: {
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: '1.8rem 1fr',
    },
    price: {
      color: '#1E3A8A',
    },
    marginTop: {
      marginTop: '2rem',
    },
  })
);

const ProductCard = ({ variant, title, price, images, location, _id }: CardProps) => {
  const classes = useStyles();

  const handleIconButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <Card elevation={8}>
      <CardActionArea>
        <CardMedia image={images[0]} className={classes.media}>
          <Link to={`/edit-advertisement/${_id}`}>
            <IconButton onMouseDown={handleIconButton} className={classes.editIcon}>
              <EditIcon />
            </IconButton>
          </Link>
        </CardMedia>
        <CardContent>
          <Typography className={classes.title} variant="h5" component="h2" noWrap>
            {title}
          </Typography>
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
          {variant === 'rentals' ? (
            <Typography
              className={classes.marginTop}
              color="textSecondary"
              variant="h6"
              component="p"
            >
              Wypożyczone od:
              <Typography color="primary" variant="h6" component="span" noWrap>
                17.06.2021 12:25
              </Typography>
            </Typography>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;

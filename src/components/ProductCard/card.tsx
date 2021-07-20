import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CardProps } from './types';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';

const ProductCard = ({ variant, title, price, images, location, _id }: CardProps) => {
  const classes = useStyles();
  const history = useHistory();

  const handleIconButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    history.push(`/edit-advertisement/${_id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridItem}>
      <Card elevation={8}>
        <CardActionArea>
          <Link to={`/category/examplecategory/${_id}`}>
            <CardMedia image={images[0]} className={classes.media}>
              {variant === 'your' ? (
                <IconButton onMouseDown={handleIconButton} className={classes.editIcon}>
                  <EditIcon />
                </IconButton>
              ) : null}
            </CardMedia>
            <CardContent>
              <Typography
                color="primary"
                className={classes.title}
                variant="h5"
                component="h2"
                noWrap
              >
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
          </Link>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductCard;

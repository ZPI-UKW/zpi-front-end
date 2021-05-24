import { IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { Carousel } from 'react-responsive-carousel';
import useStyles from './styles';
import { SliderProps } from './types';

const Slider = ({ images }: SliderProps) => {
  const classes = useStyles();

  return (
    <Carousel
      showIndicators={false}
      showThumbs={false}
      showStatus={false}
      renderArrowPrev={(clickHandler, hasPrev) =>
        hasPrev ? (
          <IconButton className={clsx(classes.sliderControl, 'start')} onClick={clickHandler}>
            <ChevronLeftIcon />
          </IconButton>
        ) : undefined
      }
      renderArrowNext={(clickHandler, hasPrev) =>
        hasPrev ? (
          <IconButton className={clsx(classes.sliderControl, 'end')} onClick={clickHandler}>
            <ChevronRightIcon />
          </IconButton>
        ) : undefined
      }
    >
      {images.map((image) => {
        return (
          <div>
            <img className={classes.image} src={image} alt="" />
          </div>
        );
      })}
    </Carousel>
  );
};

export default Slider;

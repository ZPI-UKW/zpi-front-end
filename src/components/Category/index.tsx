import { Box, Container, Typography } from '@material-ui/core';
import {
  DirectionsCarOutlined,
  PhoneIphoneOutlined,
  BuildOutlined,
  LocalMallOutlined,
  MenuBookOutlined,
  SportsSoccerOutlined,
  MusicNoteOutlined,
  HomeWorkOutlined,
  TheatersOutlined,
} from '@material-ui/icons';
import { iconName } from './icon.types';
import useStyle from './styles';
import randomColor from 'randomcolor';
import { category } from './category.interface';

const icons: any = {
  cars: DirectionsCarOutlined,
  electronics: PhoneIphoneOutlined,
  tools: BuildOutlined,
  fashion: LocalMallOutlined,
  books: MenuBookOutlined,
  sport: SportsSoccerOutlined,
  music: MusicNoteOutlined,
  estate: HomeWorkOutlined,
  movies: TheatersOutlined,
};

const getIcon = (key: iconName): JSX.Element | null => {
  const Icon = icons[key];
  return Icon ? <Icon fontSize="inherit" /> : null;
};

const Category = ({ name, icon }: category) => {
  const color = randomColor({ luminosity: 'bright' });

  const classes = useStyle({ bgColor: color });

  return (
    <Container className={classes.container}>
      <Box className={classes.box}>{getIcon(icon)}</Box>
      <Typography variant="h4" className={classes.typography}>
        {name}
      </Typography>
    </Container>
  );
};

export default Category;

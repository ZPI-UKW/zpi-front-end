import { InputAdornment, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Search as SearchIcon } from '@material-ui/icons';
import useStyles from './styles';

const Search = () => {
  const classes = useStyles();
  const history = useHistory();
  const [searchValue, setSearchValue] = useState<String>('');

  const searchItem = (value: String): void => {
    history.push({
      pathname: '/search',
      search: `?q=${value}`,
    });
  };

  return (
    <TextField
      id="search-input"
      placeholder="Wpisz..."
      variant="outlined"
      type="search"
      value={searchValue}
      onChange={(e) => setSearchValue(e.currentTarget.value)}
      onKeyPress={(e) => e.key === 'Enter' && searchItem(searchValue)}
      className={classes.searchInput}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="large" />
          </InputAdornment>
        ),
        classes: {
          input: classes.fontResize,
        },
      }}
    />
  );
};

export default Search;

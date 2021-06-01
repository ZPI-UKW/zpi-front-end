import { InputAdornment, TextField } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from '@material-ui/icons';
import useStyles from './styles';
import queryString from 'query-string';

const Search = ({ slim = false }: { slim?: true | false }) => {
  const classes = useStyles({ slim: slim });
  const history = useHistory();
  const [searchValue, setSearchValue] = useState<String>('');
  const location = useLocation();
  const searchParam = location.search ? queryString.parse(location.search).q : '';

  const searchItem = (value: String): void => {
    history.push({
      pathname: '/search',
      search: value && `?q=${value}`,
    });
  };

  useEffect(() => {
    setSearchValue(searchParam);
  }, [searchParam]);

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

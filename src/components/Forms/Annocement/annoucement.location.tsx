import { useFormikContext } from 'formik';
import { StyledAutocomplete, StyledTextField } from './styles';
import { Initial } from './types';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { useLocationContextState } from '../../../context/locationContext/locationContext';
import { Place } from '../../../context/locationContext/types';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useStyles } from './styles';

const Location = () => {
  const { values, setFieldValue } = useFormikContext<Initial>();
  const {
    autocomplete: { loading, options, setValue },
  } = useLocationContextState();
  const classes = useStyles();

  return (
    <StyledAutocomplete
      options={options}
      getOptionLabel={(option) => (option as Place).description}
      onChange={(_, value) => {
        if ((value as Place)?.description) setFieldValue('location', (value as Place).description);
      }}
      onInputChange={(_, newInputValue) => {
        if (newInputValue !== '') setValue(newInputValue as string);
        setFieldValue('location', newInputValue);
      }}
      loading={loading}
      loadingText="Ładowanie..."
      noOptionsText="Brak opcji"
      freeSolo
      renderInput={(params) => (
        <StyledTextField
          {...params}
          name="location"
          label="Lokalizacja"
          value={values.location}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(option) => {
        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.autocompleteIcon} />
            </Grid>
            <Grid item xs>
              <Typography className={classes.autocompleteTitle} variant="h6" component="p">
                {(option as Place).structured_formatting.main_text}
              </Typography>
              <Typography variant="subtitle1">
                {(option as Place).structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default Location;

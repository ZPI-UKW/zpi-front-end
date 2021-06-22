import { useFormikContext } from 'formik';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import parse from 'autosuggest-highlight/parse';
import { StyledAutocomplete, StyledTextField } from './styles';
import { Initial } from './types';
import { useLocationContextState } from '../../../context/location/locationContext';
import { Place } from '../../../context/location/types';
import { useStyles } from './styles';

const Location = () => {
  const { values, setFieldValue, errors, touched, setFieldTouched } = useFormikContext<Initial>();
  const {
    autocomplete: { loading, options, setValue },
  } = useLocationContextState();
  const classes = useStyles();

  return (
    <StyledAutocomplete
      options={options}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : (option as Place).description
      }
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
      value={values.location}
      freeSolo
      renderInput={(params) => (
        <StyledTextField
          {...params}
          value={values.location}
          name="location"
          label="Lokalizacja"
          error={touched.location && Boolean(errors.location)}
          helperText={touched.location && errors.location}
          onBlur={() => setFieldTouched('location', true)}
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
        const currentPlace = option as Place;

        const matches = currentPlace.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          currentPlace.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length])
        );
        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.autocompleteIcon} />
            </Grid>
            <Grid item xs>
              <Typography className={classes.autocompleteTitle} variant="h6" component="p">
                {parts.map((part, index) => (
                  <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                    {part.text}
                  </span>
                ))}
              </Typography>
              <Typography variant="subtitle1">
                {currentPlace.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default Location;

import { useFormikContext } from 'formik';
import { StyledAutocomplete, StyledTextField } from './styles';
import { Initial } from './types';
import { CircularProgress } from '@material-ui/core';
import { useLocationContextState } from '../../../context/locationContext/locationContext';
import { Place } from '../../../context/locationContext/types';

const Location = () => {
  const { values, setFieldValue } = useFormikContext<Initial>();
  const {
    autocomplete: { loading, options, setValue },
  } = useLocationContextState();

  return (
    <StyledAutocomplete
      options={options}
      getOptionLabel={(option) => (option as Place).description}
      onChange={(_, value) => {
        if ((value as Place)?.description) setFieldValue('location', (value as Place).description);
      }}
      onInputChange={(_, newInputValue) => {
        setValue(newInputValue as string);
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
    />
  );
};

export default Location;

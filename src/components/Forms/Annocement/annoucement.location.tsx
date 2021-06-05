import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { StyledAutocomplete, StyledTextField } from './styles';
import { Initial, Place } from './types';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import { CircularProgress } from '@material-ui/core';
import { GeolocatedProps, geolocated } from 'react-geolocated';

const Location = ({ coords }: GeolocatedProps) => {
  const { values, setFieldValue } = useFormikContext<Initial>();
  const [options, setOptions] = useState<Place[]>([]);

  const {
    ready,
    value: places,
    suggestions: { data, loading },
    setValue: setPlacesValue,
  } = usePlacesAutocomplete({
    debounce: 150,
  });

  useEffect(() => {
    setOptions(data as Place[]);
  }, [places, data]);

  useEffect(() => {
    const fetchLocation = async (lat: number, lng: number) => {
      const geocode = await getGeocode({
        location: { lat, lng },
      });

      setPlacesValue(geocode[0].formatted_address);
    };

    fetchLocation(coords?.latitude || 52.232, coords?.longitude || 21.0047);
  }, [coords]);

  return (
    <StyledAutocomplete
      options={options}
      getOptionLabel={(option) => (option as Place).description}
      onChange={(_, value) => {
        if ((value as Place)?.description) setFieldValue('location', (value as Place).description);
      }}
      onInputChange={(_, newInputValue) => setPlacesValue(newInputValue as string)}
      loading={loading}
      loadingText="Ładowanie..."
      noOptionsText="Brak opcji"
      disabled={!ready}
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

export default geolocated()(Location);

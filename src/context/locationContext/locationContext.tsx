import { createContext, useContext, useEffect, useState } from 'react';
import { GeolocatedProps, geolocated } from 'react-geolocated';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import { InitialLotationContext, Place } from './types';
import { useJsApiLoader } from '@react-google-maps/api';

const initialUserPos = {
  lan: 52.232,
  lng: 21.0047,
};

const initialState: InitialLotationContext = {
  userPos: initialUserPos,
  isMapLoaded: false,
  isMapError: false,
  autocomplete: {
    ready: false,
    loading: false,
    setValue: (val, shouldFetchData) => {},
    options: [],
  },
};

const LocationContext = createContext(initialState);
const { Provider } = LocationContext;

const LocationProvider = ({
  children,
  coords,
}: { children: React.ReactNode } & GeolocatedProps) => {
  const [userPos, setUserPos] = useState(initialUserPos);
  const [options, setOptions] = useState<Place[]>([]);

  const {
    ready,
    value: places,
    suggestions: { data, loading },
    setValue,
    init,
  } = usePlacesAutocomplete({
    debounce: 150,
    initOnMount: false,
  });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!,
    libraries: ['places'],
  });
  useEffect(() => {
    if (isLoaded && !ready) init();
  }, [isLoaded, ready, init]);

  useEffect(() => {
    if (isLoaded && ready) {
      setOptions(data as Place[]);
    }
  }, [places, data, isLoaded, ready]);

  useEffect(() => {
    if (isLoaded && ready) {
      if (coords?.latitude && coords?.longitude) {
        const { latitude, longitude } = coords;

        setUserPos({ lan: latitude, lng: longitude });
      }

      const fetchLocation = async (lat: number, lng: number) => {
        const geocode = await getGeocode({
          location: { lat, lng },
        });

        console.log(geocode);
        setValue(geocode[0].formatted_address);
      };

      fetchLocation(coords?.latitude || 52.232, coords?.longitude || 21.0047);
    }
  }, [coords, isLoaded, ready, setValue]);

  return (
    <Provider
      value={{
        userPos,
        isMapLoaded: isLoaded,
        isMapError: Boolean(loadError),
        autocomplete: { loading, ready, setValue, options },
      }}
    >
      {children}
    </Provider>
  );
};

export const useLocationContextState = () => useContext(LocationContext);

export default geolocated()(LocationProvider);

import { createContext, useContext, useEffect, useState } from 'react';
import { GeolocatedProps, geolocated } from 'react-geolocated';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import { GeoPlace, InitialLotationContext, Place } from './types';
import { useJsApiLoader } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';

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

const libraries: Libraries = ['places'];

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
  } = usePlacesAutocomplete({ initOnMount: false });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!,
    libraries,
  });

  useEffect(() => {
    const fetchLocation = async (lat: number, lng: number) => {
      const geocode = await getGeocode({
        location: { lat, lng },
      });

      const types = ['locality', 'country', 'political'];

      const filteredGeo = (geocode as GeoPlace[]).filter((place) =>
        place.types.some((el) => types.includes(el))
      );

      setValue(filteredGeo[0].formatted_address);
    };

    if (isLoaded && !ready) init();

    if (isLoaded && ready) {
      setOptions(data as Place[]);
    }

    if (isLoaded && ready && !places) {
      if (coords?.latitude && coords?.longitude)
        setUserPos({ lan: coords.latitude, lng: coords.longitude });

      fetchLocation(coords?.latitude || userPos.lan, coords?.longitude || userPos.lng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, ready, places, data]);

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

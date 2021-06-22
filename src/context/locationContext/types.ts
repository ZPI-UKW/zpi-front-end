export interface InitialLotationContext {
  userPos: {
    lan: number;
    lng: number;
  };
  isMapLoaded: boolean;
  isMapError: boolean;
  autocomplete: {
    ready: boolean;
    loading: boolean;
    setValue: (val: string, shouldFetchData?: boolean | undefined) => void;
    options: Place[];
  };
}

export interface Place {
  description: string;
  place_id: string;
  reference: string;
  types: string[];
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
    secondary_text?: string;
  };
  terms: {
    offset: number;
    value: string;
  }[];
}

export interface GeoPlace {
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
  formatted_address: string;
  place_id: string;
  types: string[];
  geometry: {
    location_type: string;
    bounds: {
      Eb: { g: number; i: number };
      oc: { g: number; i: number };
    };
  };
}

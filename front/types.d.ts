export interface RegisterMutation {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface GlobalError {
  error: string;
  message: string;
}

export interface LoginError {
  error: string;
  message: string;
  statusCode: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  token: string;
  email: string;
  googleId?: string;
}


export interface CountriesResponse {
  iso2: string;
  iso3: string;
  country: string;
  cities: string[];
}
export interface Destination {
  country: string;
  city: string;
}

export interface TripApi {
  itinerary: Destination[];
  startsAt: Date | null
  finishesAt: Date | null
}

export interface Trip {
  id: number;
  country: string;
  itinerary: string;
  startsAt: Date | null
  finishesAt: Date | null
}


export interface CountryAndCity {
  country: string;
  cities: string[]
}

export interface TripDate {
  startsAt: Date | null;
  finishesAt: Date | null
}
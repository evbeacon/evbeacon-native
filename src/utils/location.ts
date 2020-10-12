import * as Location from "expo-location";
import { LocationType } from "../types/location";
import { AddressType } from "../types/address";

export const getCurrentLocation = async (): Promise<LocationType> => {
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.LocationAccuracy.High,
  });

  if (location == null) {
    throw new Error("Could not retrieve location!");
  }

  return {
    coordinates: [location.coords.latitude, location.coords.longitude],
  };
};

export const getLocationFromAddress = async (
  address: AddressType
): Promise<LocationType> => {
  const addressString = `${address.street}, ${address.city} ${address.state} ${address.country}`;

  const locations = await Location.geocodeAsync(addressString);

  if (locations == null || locations.length === 0) {
    throw new Error("Could not retrieve location!");
  }

  const location = locations[0];

  return {
    coordinates: [location.latitude, location.longitude],
  };
};

export const getAddressFromLocation = async (
  location: LocationType
): Promise<AddressType> => {
  const addresses = await Location.reverseGeocodeAsync({
    latitude: location.coordinates[0],
    longitude: location.coordinates[1],
  });

  if (addresses == null || addresses.length === 0) {
    throw new Error("Could not retrieve address!");
  }

  const address = addresses[0];

  return {
    street: address.street!,
    city: address.city!,
    state: address.region!,
    zipCode: address.postalCode ?? undefined,
    country: address.country!,
  };
};

export const validateLocation = (location: LocationType): boolean => {
  if (location.coordinates.length !== 2) {
    return false;
  }

  const latitude = location.coordinates[0];
  const longitude = location.coordinates[1];

  return (
    latitude >= -90 && latitude <= 90 && longitude >= -180 && latitude <= 180
  );
};

export const validateAddress = (address: AddressType): boolean => {
  if (address.street == null || address.street.length < 5) {
    return false;
  } else if (address.city == null || address.city.length === 0) {
    return false;
  } else if (address.state == null || address.state.length === 0) {
    return false;
  } else if (address.country == null || address.country.length === 0) {
    return false;
  }

  return true;
};

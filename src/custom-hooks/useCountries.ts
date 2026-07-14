import {
  senegalLocations,
  SenegalLocation,
} from "@/constants/SenegalLocations";

export type Country = SenegalLocation;

const useCountries = () => {
  //get all locations (villes du Sénégal)
  const getAllCountries = () => senegalLocations;

  //to get a particular location
  const getByValue = (value: string) => {
    return senegalLocations.find((item) => item.value === value);
  };

  return {
    getAllCountries,
    getByValue,
  };
};

export default useCountries;

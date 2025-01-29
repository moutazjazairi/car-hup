import { CarProps, FilterProps } from "@/types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};


export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year = 2022, model = '', limit = 5, fuel = '' } = filters;
  console.log('Limit:', limit);
  // Check if manufacturer is provided
  if (!manufacturer) {
    console.error("Manufacturer is required");
    return [];
  }

  // Set the required headers for the API request
  const headers: HeadersInit = {
    "X-RapidAPI-Key": "d6e053aa1emsh803afdc75449682p167479jsn343a9f61d130",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  try {
    // Set the URL with the provided filters
    const response = await fetch(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}`,
      {
        method: 'GET',
        headers: headers,
      }
    );

    // Check for a successful response
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to fetch data:", response.status, response.statusText, errorText);
      return [];
    }

    // Parse the response as JSON
    const result = await response.json();

    // Log the result to check the data structure
    console.log('Fetched cars:', result);
    
    // Return the result (could be an array of cars)
    return result;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append('customer', 'img');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
} 


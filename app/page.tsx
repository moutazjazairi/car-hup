"use client";
import { useState, useEffect } from 'react';
import { carsData } from "@/constants/carsData";  // Import the static car data
import { CarCard, SearchBar, CustomFilter, Hero } from "@/components";
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import { fuels, yearsOfProduction } from "@/constants";
import ShowMore from "@/components/ShowMore";

export default function Home() {
  const search = useSearchParams(); // Use the hook to get searchParams dynamically

  // Retrieve parameters safely after unwrapping them
  const manufacturer = search.get('manufacturer') || '';
  const year = search.get('year') || '';
  const fuel = search.get('fuel') || '';
  const model = search.get('model') || '';
  
  // Pagination State
  const [visibleCars, setVisibleCars] = useState(12); // Initially show 12 cars
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [isDataEmpty, setIsDataEmpty] = useState<boolean>(false);

  useEffect(() => {
    const filterCars = () => {
      let filtered = carsData;

      if (manufacturer) {
        filtered = filtered.filter((car) =>
          car.make.toLowerCase().includes(manufacturer.toLowerCase())
        );
      }

      if (year) {
        filtered = filtered.filter((car) => car.year.toString() === year);
      }

      if (fuel) {
        filtered = filtered.filter((car) => car.fuel.toLowerCase() === fuel.toLowerCase());
      }

      if (model) {
        filtered = filtered.filter((car) =>
          car.model.toLowerCase().includes(model.toLowerCase())
        );
      }

      // Update the filtered cars state
      setFilteredCars(filtered);
      setIsDataEmpty(filtered.length === 0);
    };

    filterCars();
  }, [manufacturer, year, fuel, model]); // Dependencies for useEffect

  // Load more cars when "Show More" is clicked
  const handleShowMore = () => {
    setVisibleCars((prevVisibleCars) => prevVisibleCars + 12); // Show 12 more cars
  };

  // Slice the filtered cars based on the current "visibleCars" state
  const carsToDisplay = filteredCars.slice(0, visibleCars);

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore our cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container z-10'>
            <CustomFilter title="fuel" options={fuels} carsData={carsData} />
            <CustomFilter title="Year" options={yearsOfProduction} carsData={carsData} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {carsToDisplay.map((car) => (
                <CarCard key={car.model + car.year} car={car} />
              ))}
            </div>

            {/* "Show More" Button */}
            {visibleCars < filteredCars.length && (
              <div className="flex w-[150px] h-[50px] items-center justify-center lg:ml-[600px] bg-primary-blue text-white rounded-full mt-10 
    sm:ml-0 sm:w-[120px] sm:h-[40px] sm:mt-5 sm:px-4">
                <button onClick={handleShowMore} className="show-more-btn">
                  Show More
                </button>
              </div>
            )}
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>No cars match your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}

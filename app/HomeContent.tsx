"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation"; 
import { carsData } from "@/constants/carsData";
import { CarCard, SearchBar, CustomFilter, Hero } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";

export default function HomeContent() {
  const search = useSearchParams();
  const router = useRouter();

  const manufacturer = search.get("manufacturer") || "";
  const year = search.get("year") || "";
  const fuel = search.get("fuel") || "";
  const model = search.get("model") || "";

  const [visibleCars, setVisibleCars] = useState(12);
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const scrollPosition = useRef(0);
  const resetButtonRef = useRef<HTMLButtonElement | null>(null);  // Correct type for button
  const isSearchOrFilterApplied = useRef(false);  // Tracks if filters are applied.

  useEffect(() => {
    // Scroll to the reset button after applying the search or filter
    const scrollToResetButton = () => {
      if (resetButtonRef.current) {
        const resetButtonPosition = resetButtonRef.current.getBoundingClientRect().top;
        window.scrollTo(0, resetButtonPosition + window.scrollY); // Adjust scroll position to the button's position
      }
    };

    if (manufacturer || year || fuel || model) {
      isSearchOrFilterApplied.current = true;  // Indicate that a search/filter was applied
      scrollToResetButton();  // Scroll to the reset button position
    }

    if (isSearchOrFilterApplied.current) {
      // Prevent scroll reset behavior on the next renders
      isSearchOrFilterApplied.current = false;
    }

  }, [manufacturer, year, fuel, model]);

  useEffect(() => {
    const filterCars = () => {
      let filtered = carsData;
      if (manufacturer) filtered = filtered.filter((car) => car.make.toLowerCase().includes(manufacturer.toLowerCase()));
      if (year) filtered = filtered.filter((car) => car.year.toString() === year);
      if (fuel) filtered = filtered.filter((car) => car.fuel.toLowerCase() === fuel.toLowerCase());
      if (model) filtered = filtered.filter((car) => car.model.toLowerCase().includes(model.toLowerCase()));

      setFilteredCars(filtered);
      setIsDataEmpty(filtered.length === 0);
    };

    filterCars();
  }, [manufacturer, year, fuel, model]);

  const handleShowMore = () => {
    setVisibleCars((prevVisibleCars) => prevVisibleCars + 12);
  };

  // **Reset search**
  const handleResetSearch = () => {
    router.push("/"); // Clear search params by navigating to the home page
    isSearchOrFilterApplied.current = false; // Reset the search status when resetting.
  };

  const carsToDisplay = filteredCars.slice(0, visibleCars);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore our cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container z-10">
            <CustomFilter title="fuel" options={fuels} carsData={carsData} />
            <CustomFilter title="Year" options={yearsOfProduction} carsData={carsData} />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            ref={resetButtonRef}  // Attach ref to the Reset Search button
            onClick={handleResetSearch}
            className="flex w-[150px] h-[50px] items-center justify-center lg:ml-[00px] lg:h-[50px] lg:w-[150px] bg-primary-blue text-white rounded-full mt-10 
    sm:ml-0 sm:w-[120px] sm:h-[40px] sm:mt-5 sm:px-4"
          >
            Reset Search
          </button>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {carsToDisplay.map((car) => (
                <CarCard key={car.model + car.year} car={car} />
              ))}
            </div>
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
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>No cars match your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}

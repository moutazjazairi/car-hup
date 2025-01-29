"use client";
import { useState, Fragment } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

const CustomFilter = ({ title, options, carsData }: CustomFilterProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState(options[0]);

  const handleUpdateParams = (e: { title?: string | number; value?: string | number }) => {
    if (!e.value) return;
    const newPathName = updateSearchParams(title ?? "", String(e.value).toLowerCase());
    router.push(newPathName);
  };

  const handleFilterChange = (value: string | number | undefined) => {
    if (value === undefined) return; // Early return if value is undefined
  
    // If carsData is undefined or empty, return early.
    if (!carsData || carsData.length === 0) return;
  
    let filteredCars = carsData;
  
    // If the value is an empty string, return all cars
    if (value === "") {
      filteredCars = carsData; // Show all cars when no specific filter is selected
    } else if (title === "Year" && typeof value === "string") {
      // Ensure both the value and car.year are strings for comparison
      const selectedYear = String(value);  // Convert value to string
      filteredCars = carsData.filter(car => String(car.year) === selectedYear);  // Convert car.year to string for comparison
    } else if (title === "Fuel" && typeof value === "string") {
      filteredCars = carsData.filter(car => car.fuel.toLowerCase() === String(value).toLowerCase());
    }
  
    // Update your state or UI with filtered cars here
    console.log(filteredCars); // You can use this to display filtered cars, for example.
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e); // Update the selected option in state
          handleUpdateParams(e); // Update the URL search parameters and navigate to the new URL
          handleFilterChange(e.value); // Filter cars based on the selected value
        }}
      >
        <div className='relative w-fit z-10'>
          <ListboxButton className='custom-filter__btn'>
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className="ml-4 object-contain"
              alt="up down"
            />
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="custom-filter__options">
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`
                  }
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.title}
                    </span>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;

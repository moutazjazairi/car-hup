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
    if (value === undefined) return; 
  

    if (!carsData || carsData.length === 0) return;
  
    let filteredCars = carsData;
  
  
    if (value === "") {
      filteredCars = carsData; 
    } else if (title === "Year" && typeof value === "string") {

      const selectedYear = String(value); 
      filteredCars = carsData.filter(car => String(car.year) === selectedYear);  
    } else if (title === "Fuel" && typeof value === "string") {
      filteredCars = carsData.filter(car => car.fuel.toLowerCase() === String(value).toLowerCase());
    }
  

    console.log(filteredCars);
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e); 
          handleUpdateParams(e); 
          handleFilterChange(e.value); 
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

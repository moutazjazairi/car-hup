import { MouseEventHandler } from "react";
export interface CustomButtonProps {
    title:string;
    containerStyles?:string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
}

export interface SearchManufacturerProps{
    manufacturer: string;
    setManufacturer: (manufacturer:string) =>void;
}

export interface CarProps {
    "city_mpg": number;

    "drive": string;


    "make": string;
    "model": string;
    "transmission": string;
    "year": number;
}


export interface FilterProps {
    manufacturer?: string;
    year?: string | number;
    model?: string;
    limit?: string | number;
    fuel?: string;
    make?: string;
    
  }
  
  export interface HomeProps {
    searchParams: FilterProps;
  }
  export interface OptionProps {
    title?: string | number;
    value?: string | number;
  }
  interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    city_mpg: number;
    transmission: string;
    drive: string;
    fuel: string;
  }

  export interface CustomFilterProps {
    title?: string;
    options: OptionProps[];
    carsData?: Car[];
  }
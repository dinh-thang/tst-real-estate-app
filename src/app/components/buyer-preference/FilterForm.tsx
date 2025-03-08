"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Property, PropertyType } from "@/app/_types";

import Input from "../ui/forms/Input";
import PrimaryButton from "../ui/buttons/PrimaryButton";

interface FilterFormProps {

}

export interface FilterForm {
  location: string;
  minPrice: number;
  maxPrice: number;
  type: PropertyType;
}

const FilterForm: React.FC<FilterFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FilterForm>();

  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    console.log(data);
  };
  
  return (
    <form 
      className="flex flex-col items-center border-r border-gray-200 h-full bg-gray-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="py-4">Search Filters</h1>
      
      <div className="px-4 flex flex-col gap-2">
        <Input 
          label="Location"
          placeholder="Location"
          {...register("location")}
        />

        <Input
          label="Min Price"
          placeholder="Min Price"
          {...register("minPrice")}
        />

        <Input
          label="Max Price"
          placeholder="Max Price"
          {...register("maxPrice")}
        />

        <select 
          className="w-full text-sm rounded text-black/50 border border-gray-200 focus:outline-0 p-2" 
          {...register("type", {required: true})}
        >
          <option disabled value="">Select Property Type</option>
          {Object.values(PropertyType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}          
        </select>

        <PrimaryButton className="mt-2" type="submit">Search</PrimaryButton>
      </div>
    </form>
  );
}

export default FilterForm;
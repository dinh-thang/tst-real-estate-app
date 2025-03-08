"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { PropertyType } from "@/app/_types";

import Input from "../ui/forms/Input";
import PrimaryButton from "../ui/buttons/PrimaryButton";
import { useRouter } from "next/navigation";

export interface FilterFormProps {
}


export interface FilterForm {
  location: string;
  minPrice: number;
  maxPrice: number;
  type: PropertyType | "";
}

const FilterForm: React.FC<FilterFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FilterForm>();
  const router = useRouter();
  
  const onSubmit: SubmitHandler<FilterForm> = (data) => {
    const params = new URLSearchParams();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      } 
    });

    router.push(`?${params.toString()}`);
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

        <div>
          <Input
            label="Min Price"
            placeholder="Min Price"
            {...register("minPrice", {valueAsNumber: true})}
          />
          {errors.minPrice && <span className="text-red-500">This field is required</span>}
        </div>

        <div>
          <Input
            label="Max Price"
            placeholder="Max Price"
            {...register("maxPrice", {valueAsNumber: true})}
          />
          {errors.maxPrice && <span className="text-red-500">This field is required</span>}
        </div>

        <select 
          className="w-full bg-white text-sm rounded border border-gray-200 focus:outline-0 p-2" 
          {...register("type")}
          defaultValue={""}
        >
          <option className="text-black/50" value="">None</option>
          {Object.values(PropertyType).map((type) => (
            <option className="text-black" key={type} value={type}>{type}</option>
          ))}          
        </select>

        <PrimaryButton className="mt-2" type="submit">Search</PrimaryButton>
      </div>
    </form>
  );
}

export default FilterForm;
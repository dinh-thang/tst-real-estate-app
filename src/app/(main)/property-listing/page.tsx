"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import Input from "@/app/components/forms/Input";
import { Property, PropertyType } from "@/app/_types";
import { createProperty } from "@/app/_libs/fetcher";
import PrimaryButton from "@/app/components/buttons/PrimaryButton";
import Link from "next/link";


export default function PropertyListingPage() {
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Property>();

  const uploadProperty = useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      setSubmitted(true);
    }    
  });
  
  const onSubmit: SubmitHandler<Property> = (data) => {
    uploadProperty.mutate(data);
  } 

  return (
    <main className="flex flex-col items-center h-full">
      <h1 className="text-2xl font-bold my-6">Add New Property</h1>
      
      <form 
        className="flex flex-col gap-4 h-auto w-1/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input 
          className="w-full rounded focus:bg-gray-100 focus:outline-0"
          label="title"
          placeholder="Property Title"
          {...register("title", {required: true})}
        />
        {errors.title && <span className="text-red-500">This field is required</span>}

        <Input 
          className="w-full"
          label="location"
          placeholder="Property Location"
          {...register("location")}
        />

        <Input 
          className="w-full rounded focus:bg-gray-100 focus:outline-0"
          label="price"
          placeholder="Property Price"
          {...register("price")}
        />

        <select className="w-full rounded focus:bg-gray-100 border border-gray-200 focus:outline-0 p-2" {...register("type")}>
          <option className="" value="">Select Property Type</option>
          {Object.values(PropertyType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}          
        </select>

        <PrimaryButton className="w-full mt-2" type="submit">Add Property</PrimaryButton>
        {submitted && <span className="text-green-500">Property added successfully, checkout <Link className="underline" href="/">Buyer Preference</Link> page</span>}
      </form>
    </main>
  );
}
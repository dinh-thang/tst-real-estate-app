"use client";

import { fetchProperties } from "@/app/_libs/fetcher";
import { Property } from "@/app/_types";
import { useQuery } from "@tanstack/react-query";
import Card from "../ui/cards/Card";
import { useSearchParams } from "next/navigation";

const PropertiesContainer = () => {
  const searchParams = useSearchParams();

  const location = searchParams.get("location") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const type = searchParams.get("type") || "";
  
  const getAllProperties = useQuery({
    queryKey: ["getAllProperties", { location, minPrice, maxPrice, type }],
    queryFn: () => fetchProperties({ location, minPrice, maxPrice, type })
  })

  if (!getAllProperties.data) return;
  
  return (
    <div className="flex flex-1 p-6 flex-col gap-4 items-center h-[calc(100vh-56px)] overflow-y-auto">
      {getAllProperties.data.map((property: Property, index: number) => (
        <Card className="w-[512px]" key={index}>
          <p className="text-2xl font-medium pb-2">{property.title}</p>
          <p className="text-sm text-black/50">Location: {property.location}</p>
          <p className="text-sm text-black/50">Price: {property.price}</p>
          <p className="text-sm text-black/50">Type: {property.type}</p>
        </Card>
      ))}
    </div>
  );
}

export default PropertiesContainer;
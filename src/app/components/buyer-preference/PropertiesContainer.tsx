"use client";

import { fetchProperties } from "@/app/_libs/fetcher";
import { Property } from "@/app/_types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Card from "../ui/cards/Card";

const PropertiesContainer = () => {
  const queryClient = useQueryClient();
  
  const getAllProperties = useQuery({
    queryKey: ["getAllProperties"],
    queryFn: fetchProperties
  })

  if (!getAllProperties.data) return;
  
  return (
    <div className="flex flex-1 p-6 flex-col gap-4 items-center h-[calc(100vh-56px)] overflow-y-auto">
      {getAllProperties.data.map((property: Property) => (
        <Card className="w-[512px]" key={property.title}>
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
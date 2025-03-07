import { Property } from "../_types";

export async function createProperty(property: Property) {
  const response = await fetch("http://localhost:3000/api/properties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(property)
  });

  if (!response.ok) {
    throw new Error("Failed to create property");
  }

  return response.json();
}

export async function fetchProperties() {
  const response = await fetch("http://localhost:3000/api/properties", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return response.json();
}
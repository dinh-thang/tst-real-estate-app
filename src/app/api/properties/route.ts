import { NextRequest } from "next/server";
import path from "path";
import fs from "fs";
import { Property } from "@/app/_types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const filePath = path.join(process.cwd(), "src", "app", "api", "data", "data.json");
    const dirPath = path.dirname(filePath);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    let existingData: any[] = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      if (fileContent.trim()) {
        existingData = JSON.parse(fileContent);
      }

    }

  
    existingData.push(body);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), "utf8");
    
    return new Response(
      JSON.stringify({ 
        message: "Posted successfully", 
        data: body 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error at POST /api/properties:", error);
    return new Response(
      JSON.stringify({ 
        message: "An error occurred", 
        error: error 
      }), 
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}

export async function GET(request: NextRequest) {  
  try {
    const filePath = path.join(process.cwd(), "src", "app", "api", "data", "data.json");
    
    if (!fs.existsSync(filePath)) {
      return new Response(
        JSON.stringify({ 
          message: "There is no data in data.json file",
          data: []
        }), 
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContent);

    const searchParams = request.nextUrl.searchParams;

    if (searchParams.toString() === "") {
      return new Response(
        JSON.stringify(data), 
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    } else {
      console.log("SEARCH_PARAMS:", searchParams.toString());
      let filterData = data;

      const location = searchParams.get("location");
      if (location) {
        filterData = filterData.filter((property: Property) => property.location.toLowerCase().includes(location.toLowerCase()));
        console.log("FILTER_DATA_LOCATION:", filterData);
      }

      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      console.log("MIN_PRICE:", minPrice);
      console.log("MAX_PRICE:", maxPrice);
      if (minPrice) {
        filterData = filterData.filter((property: Property) =>
          property.price >= parseFloat(minPrice)
        );
        
      }
    
      if (maxPrice) {
        filterData = filterData.filter((property: Property) =>
          property.price <= parseFloat(maxPrice)
        );
      }
    
      const type = searchParams.get("type");
      if (type) {
        filterData = filterData.filter((property: Property) => property.type.toLowerCase() === type.toLowerCase());
      }

      return new Response(
        JSON.stringify(filterData), 
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    
  } catch (error) {
    console.error("Error in GET /api/properties:", error);

    return new Response(
      JSON.stringify({ 
        message: "An error occurred", 
        error: error 
      }), 
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
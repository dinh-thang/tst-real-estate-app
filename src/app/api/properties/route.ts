import { NextRequest } from "next/server";
import path from "path";
import fs from "fs";

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

    
    
    return new Response(
      JSON.stringify(data), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
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
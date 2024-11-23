import { NextRequest, NextResponse } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY || "google_gemini_api_key";
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `${prompt}`,
            },
          ],
        },
      ],
    });

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDo2K54Lm_7TVoaHcgsfHTjEZLkA8fuvGo",
      {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "An error occurred while fetching the Gemini response" },
        { status: 500 }
      );
    } else {
      const response = await res.text();
      console.log( response );
    
      return NextResponse.json(
        { response: response, success: true },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("error occured " + error);
  }
}
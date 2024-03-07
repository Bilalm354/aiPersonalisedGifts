import { log } from "@/functions/log";
import OpenAI from "openai";

export const generateOpenAiImageUrl: (prompt: string) => Promise<string> = async (
  prompt: string,
) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error(
        "API key not found. Please set the OPENAI_API_KEY in your .env file.",
      );
      throw new Error("API key not found");
    }

    const openai = new OpenAI({ apiKey });

    log("Generating image...", { prompt });

    const response = await openai.images.generate({
      prompt,
      model: "dall-e-3",
      n: 1,
      quality: 'hd',
      response_format: "url",
      style: "natural",
    });

    const url = response.data[0].url!;
    log("Generated image:", { url });

    return url;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Error generating image");
  }
};
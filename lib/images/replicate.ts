import { log } from "console";

async function createReplicateImageJob(prompt: string) {
  return await fetch(
    "https://api.replicate.com/v1/predictions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      },
      cache: "no-store",
      body: JSON.stringify({
        "version": "610dddf033f10431b1b55f24510b6009fcba23017ee551a1b9afbc4eec79e29c",
        "input": {
          "width": 1024,
          "height": 1024,
          "prompt": `IMAGE PROMPT: ${prompt}`,
          "refine": "expert_ensemble_refiner",
          "scheduler": "KarrasDPM",
          "num_outputs": 1,
          "guidance_scale": 7.5,
          "high_noise_frac": 0.8,
          "prompt_strength": 0.8,
          "num_inference_steps": 50
        }
      })
    })
}

async function getReplicatePrediction(getPredicationUrl: string) {
  return await fetch(
    getPredicationUrl,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
      },
      cache: "no-store",
    })
}

export const generateReplicateImageUrl: (prompt: string) => Promise<string> = async (
  prompt: string,
) => {
  try {
    log("Generating image with prompt", prompt);
    const prediction = await createReplicateImageJob(prompt);
    const createJobResponse = await prediction.json();
    let getPredictionStatusUrl = createJobResponse.urls.get;
    let predictionUrl = "";
    let predictionStatus = "starting";

    while (predictionStatus !== "succeeded") {
      const predictionResult = await getReplicatePrediction(getPredictionStatusUrl);
      const predictionResultJson = await predictionResult.json();
      predictionStatus = predictionResultJson.status;
      log("Prediction status:", predictionStatus);
      if (predictionStatus === "succeeded") {
        predictionUrl = predictionResultJson.output[0];
      } else {
        // Wait for 5 seconds before polling again
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    return predictionUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Error generating image");
  }
}
"use client";

import Image from "next/image";
import { useState } from "react";

export default function AIImage() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setImage(null);

    try {
      // First, send the request to generate the image
      const generateRes = await fetch("/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (generateRes.ok) {
        const generateData = await generateRes.json();
        const jobId = generateData.job;

        // Polling for the image
        let imageFetched = false;
        while (!imageFetched) {
          // Wait for a few seconds before sending the GET request
          await new Promise((resolve) => setTimeout(resolve, 3000));

          // Send the request to fetch the generated image
          const getImageRes = await fetch(`/api/getImage?jobId=${jobId}`);

          if (getImageRes.ok) {
            const getImageData = await getImageRes.json();
            if (getImageData.imageUrl) {
              setImage(getImageData.imageUrl);
              imageFetched = true;
            }
          } else {
            console.error("Error fetching image:", getImageRes.statusText);
          }
        }
      } else {
        console.error("Error generating prompt:", generateRes.statusText);
      }
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <form
        className="md:w-1/2 w-full mx-auto px-5 md:px-0 flex gap-1 mt-4"
        onSubmit={handleGenerate}
      >
        <input
          type="text"
          name=""
          id=""
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Jelaskan gambar yang ingin kamu buat..."
          className="input input-bordered w-full bg-white"
        />
        <button
          className="btn border-none bg-orange-500 hover:bg-orange-600 shadow-sm text-white"
          type="submit"
        >
          Kirim
        </button>
      </form>
      <section className="w-full mt-5 px-12">
        {loading && <p className="text-center">Loading...</p>}
      </section>
      {image && (
        <section className="mx-auto w-fit">
          <Image
            src={image}
            alt="Generated"
            width={400}
            height={400}
            className="rounded-lg border-4 border-white shadow-md"
          />
        </section>
      )}
    </main>
  );
}

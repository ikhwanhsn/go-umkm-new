"use client";

import AIImage from "@/components/AIImage";
import AIText from "@/components/AIText";
import { useState } from "react";

export default function AI() {
  const [isImage, setIsImage] = useState(false);

  return (
    <main className="pt-12 min-h-screen w-full">
      <h1 className="text-2xl text-center font-bold text-orange-500">
        GOUMKM AI
      </h1>
      <section className="flex justify-center gap-1 mt-2">
        <button
          className={`btn btn-sm w-28 ${
            isImage
              ? "bg-slate-50 text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white hover:border-none"
              : "text-white bg-orange-500 hover:bg-orange-600 border-none"
          }`}
          onClick={() => setIsImage(false)}
        >
          Tanya AI
        </button>
        <button
          className={`btn btn-sm w-28 ${
            !isImage
              ? "bg-slate-50 text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white hover:border-none"
              : "text-white bg-orange-500 hover:bg-orange-600 border-none"
          }`}
          onClick={() => setIsImage(true)}
        >
          Buat gambar
        </button>
      </section>

      {!isImage && <AIText />}
      {isImage && <AIImage />}
    </main>
  );
}

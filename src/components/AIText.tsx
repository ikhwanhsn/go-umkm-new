"use client";

import { generateText } from "@/services/generateText";
import { useState } from "react";

const AIText = () => {
  const [dataContent, setDataContent] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const renderContent = (content: string) => {
    const paragraphs = content
      .split("\n\n")
      .map((paragraph: any, index: any) => <p key={index}>{paragraph}</p>);
    return paragraphs;
  };

  const generateContent = async (event: any) => {
    event.preventDefault();
    setAnswer(null);
    setIsLoading(true);
    const data = await generateText(question);
    if (data) {
      const format = data.replace(/\*\*/g, "");
      const transform = format.replace(/\*/g, "\n -");
      setDataContent(transform);
      const renderedContent = renderContent(transform);
      setAnswer(renderedContent);
      setIsLoading(false);
    }
  };

  return (
    <main>
      <form
        className="md:w-1/2 w-full mx-auto px-5 md:px-0 flex gap-1 mt-4"
        onSubmit={generateContent}
      >
        <input
          type="text"
          name=""
          id=""
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Tanya saya sesuatu..."
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
        {isLoading && <p className="text-center">Loading...</p>}
      </section>
      {answer !== null && (
        <section className="md:w-3/4 w-full mt-5 mx-auto bg-white px-8 py-5 rounded-lg">
          {answer}
        </section>
      )}
    </main>
  );
};

export default AIText;

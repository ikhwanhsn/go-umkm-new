const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_GOOGLE);

export async function generateText(question: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.log(error);
  }
}

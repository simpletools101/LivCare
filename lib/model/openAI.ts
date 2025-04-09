import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

console.log("CURRENT_KEU",process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

export async function requestFromAI(userRequestContent: string) {

    const prompt = `
Extract cow disease symptoms from the following input and give me one line answer .

Return a single JSON object with:
- "diseases": in one sentence
- "recommendations": in one sentence

Only return one JSON object. No explanations, no additional text, no markdown.

User input: "${userRequestContent}"
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{
                role: "user", parts: [
                    { text: prompt }
                ]
            }],
        });

        
        let RESPONSE_TEXT = response.text!;

        const cleanedString = RESPONSE_TEXT.replace(/```json|```/g, '').trim();
        console.log("formated-data",cleanedString)
        const currentJSON = JSON.parse(cleanedString)
       

        return {
            aiAnswer: currentJSON.diseases || "Disease info not found.",
            aiRecommendation: currentJSON.recommendations || "No recommendation.",
        };
    } catch (error) {

    }
}

import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
})

export async function requestFromAI(userRequestContent: string) {
const prompt = `
You are an animal health assistant helping Ugandan farmers.

From the input below, extract key cow disease symptoms and give a helpful one-line diagnosis.

Respond in a **single JSON object** like this:
{
  "diseases": "A short sentence explaining what the cow may be suffering from in farmer-friendly language.",
  "solution": "A recommended drug (name), how to give it (e.g., injection or oral), and correct dosage. Keep the context relevant to Uganda. End with: 'Consult a veterinary doctor for accurate diagnosis and treatment.'",
  "error": true or false // Set to true only if symptoms do not match any known disease
}

⚠️ Important:
- NO extra text, markdown, emojis, or titles like 'Possible Diseases' or 'Recommended Solution'.
- The entire response must be valid JSON only.
- Keep it simple and accurate.

User input: "${userRequestContent}"
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }],
                },
            ],
        })

        let RESPONSE_TEXT = response.text!

        const cleanedString = RESPONSE_TEXT.replace(/```json|```/g, '').trim()
        console.log('formated-data', cleanedString)
        const currentJSON = JSON.parse(cleanedString)
        console.log(currentJSON)

        return {
            aiAnswer: currentJSON.diseases || 'Disease info not found.',
            aiRecommendation: currentJSON.solution || 'No recommendation.',
        }
    } catch (error) {}
}

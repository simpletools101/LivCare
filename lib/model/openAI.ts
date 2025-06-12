import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
})

export async function requestFromAI(userRequestContent: string) {
const prompt = `
You are an animal health officer specializing in East African cattle diseases.

From the symptoms provided below, determine the most likely and exact disease name (≥90% certainty) affecting the cow.

Respond in a **single valid JSON object** as shown:
{
  "diseases": "Exact disease name (e.g., East Coast Fever, Trypanosomiasis, Anaplasmosis, etc.).",
  "solution": "Exact drug name, dosage (based on body weight if applicable), and route of administration. Example: 'Use Diminazene aceturate, inject 3.5 mg/kg body weight intramuscularly once. Consult a veterinary doctor for accurate diagnosis and treatment.'",
  "error": true or false
}

Rules:
- Do not include farmer-friendly terms or summaries — give exact veterinary disease names.
- If no symptoms are present, or no disease can be matched, return empty strings for 'diseases' and 'solution', and set 'error' to true.
- Return only valid JSON. No markdown, explanations, or extra text.
- Make sure the drug and dosage are appropriate for Uganda and East African veterinary practice.

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

import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.NEXTJS_OPENAPIKEY, // Add your OpenAI API key here
})

export async function requestFromAI(userRequestContent: string) {
    const systemInstruction = {
        system: {
            role: 'veterinarian_assistant',
            description: 'Provides information about cow diseases based on user input.',
            constraints: ['Do not offer medical advice for humans.', 'All responses must be valid JSON.'],
        },
        behavior: {
            information_scope: 'Only provide details about cow diseases.',
            interaction_rules: [
                'Extract disease-related keywords from user input.',
                'Return structured data with disease name, symptoms, causes, and possible treatments.',
            ],
        },
    }

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', 
        messages: [
            {
                role: 'system',
                content: JSON.stringify(systemInstruction),
            },
            {
                role: 'user',
                content: userRequestContent,
            },
        ],
        response_format: {
            type: 'json_object',
        },
    })
  // Parse the AI's response
  const aiResponse = response.choices[0].message.content;

  // Extract disease information and recommendations
  const parsedResponse = {

    //@ts-ignore
      aiAnswer: aiResponse.disease || "Disease information not found.",
    //@ts-ignore
      aiRecommendation: aiResponse.recommendation || "Recommendation not available."
  };

  return parsedResponse;
}

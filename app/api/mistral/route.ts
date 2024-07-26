import MistralClient from '@mistralai/mistralai';

export async function POST(req: any, res: any): Promise<Response> {
  try {
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      return new Response('API key is missing', { status: 400 });
    }

    const client = new MistralClient(apiKey);
    const message = await req.text();
    const chatStreamResponse = client.chatStream({
      model: 'mistral-tiny',
      messages: [
        {
          role: 'system',
          content: `
          OUTPUT FORMAT: {Output your response in a conversational format.}
          USER MESSAGE: ${message}`
        }
      ]
    });

    let responseText = '';
    for await (const chunk of chatStreamResponse) {
      if (chunk.choices[0].delta.content !== undefined) {
        responseText += chunk.choices[0].delta.content;
      }
    }
    //await new Promise((resolve) => setTimeout(resolve, 2000)); //thinking time

    // Return the chat response as a Response object
    return new Response(responseText, { status: 200 });
  } catch (error) {
    console.error('An error occurred:', error);
    // Return an error response in case of failure
    return new Response('An error occurred', { status: 500 });
  }
}

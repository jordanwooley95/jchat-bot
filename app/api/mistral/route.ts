import MistralClient from '@mistralai/mistralai';

export async function POST() {
  const apiKey = process.env.MISTRAL_API_KEY;

  const client = new MistralClient(apiKey);

  const chatStreamResponse = await client.chatStream({
    model: 'mistral-tiny',
    messages: [
      {
        role: 'user',
        content: 'Tell me about some basic network security tips'
      }
    ]
  });
  console.log('Chat Stream:');
  for await (const chunk of chatStreamResponse) {
    if (chunk.choices[0].delta.content !== undefined) {
      const streamText = chunk.choices[0].delta.content;
      process.stdout.write(streamText);
    }
  }
}

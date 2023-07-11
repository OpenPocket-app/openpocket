// src/index.ts
import * as express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from "openai"

const envPath = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: envPath });

const app = express();
const port = 4000;

app.use(express.json());
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

let messages: ChatCompletionRequestMessage[] = [];
messages.push({
  role: "system",
  content: "You are a financial coach. I will be asking you questions"
});

app.post('/api/prompt', async (req, res) => {
  const { prompt } = req.body;

  messages.push({
    role: "user",
    content: prompt
  })
  
  try {
    const gptResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        messages
    });

    res.send(gptResponse.data.choices[0].message);
  } catch (error: any) {
      if (error.response) {
          console.error(error.response.status);
          console.error(error.response.data);
      } else {
          console.error(error.message);
      }
  }
});

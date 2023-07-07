import * as express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi} from "openai"

const envPath = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: envPath });

const app = express();
const port = 4000;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get('/', async (req, res) => {
  try {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-16k",
        messages: [{
          role: "user",
          content: "You are a financial coach. Start with one quick short question"
        }],
  });
    res.send(completion.data.choices[0].message);
  } catch (error: any) {
      if (error.response) {
          console.error(error.response.status);
          console.error(error.response.data);
      } else {
          console.error(error.message);
      }
  }
});

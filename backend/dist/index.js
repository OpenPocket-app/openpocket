"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const openai_1 = require("openai");
const envPath = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv.config({ path: envPath });
const app = express();
const port = 4000;
app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
});
const configuration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completion = yield openai.createChatCompletion({
            model: "gpt-3.5-turbo-16k",
            messages: [{
                    role: "user",
                    content: "You are a financial coach. Start with one quick short question"
                }],
        });
        res.send(completion.data.choices[0].message);
    }
    catch (error) {
        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);
        }
        else {
            console.error(error.message);
        }
    }
}));

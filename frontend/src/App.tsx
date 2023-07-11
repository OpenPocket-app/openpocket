// src/App.tsx
import React, { useState, useEffect } from 'react';
import { sendPrompt } from './services/api';

interface ResponseData {
  role: string;
  content: string;
}

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (prompt) {
      const data: ResponseData = await sendPrompt(prompt);
      setResponse(data.content);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  return (
    <div className="container mx-auto my-2 px-2">
      <textarea readOnly value={response} className="border" rows={5} />
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={prompt} onChange={handleInputChange} className='border' />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;

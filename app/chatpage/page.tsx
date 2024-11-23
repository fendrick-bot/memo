'use client'

import { useState } from 'react';

const ChatPage = () => {
  const [prompt, setPrompt] = useState(''); // Store input from the user
  const [response, setResponse] = useState(''); // Store the GPT response
  const [loading, setLoading] = useState(false); // Show loading state
  const [error, setError] = useState(''); // Store any error

  // Function to handle button click and call the API
  const handleClick = async () => {
    setLoading(true);
    setError(''); // Clear previous errors
    setResponse(''); // Clear previous response
  
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      const data = await res.json();
      const generateText = JSON.parse(data.response);

      if (res.ok) {
        console.log(generateText.candidates[0].content.parts[0].text)
        setResponse(generateText.candidates[0].content.parts[0].text); // Set the GPT response
      } else {
        // Check if error is an object, and extract the message
        // const errorMessage =
        //   typeof data.error === 'object'
        //     ? data.error.message || JSON.stringify(data.error)
        //     : data.error;
  
        setError( 'An error occurred.');
      }
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h1>Chat with GPT</h1>

      {/* Input field to enter a prompt */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        rows={4}
        cols={50}
      />

      {/* Button to submit the prompt */}
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Submit'}
      </button>

      {/* Display the response */}
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}

      {/* Display error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ChatPage;

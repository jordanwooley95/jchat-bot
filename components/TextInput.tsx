'use client';

import axios from 'axios';
import { useState } from 'react';

export default function TextInput() {
  const [message, setMessage] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleClick = () => {
    setMessage('');
    axios
      .post('/api/mistral', {
        message: message
      })
      .then((response) => {
        setResponseData(response.data);
      });
  };

  return (
    <>
      <input
        onChange={handleChange}
        type='text'
        value={message}
        placeholder='Type a message...'
        aria-label='Type a message'
        className='flex-1 mr-4 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 p-2 text-sm'
      />
      <button
        onClick={handleClick}
        className='bg-blue-600 dark:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm'
      >
        Send
      </button>
    </>
  );
}

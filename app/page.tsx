'use client';

import axios from 'axios';
import { useState } from 'react';

export default function TextInput() {
  const [message, setMessage] = useState('');
  const [responseData, setResponseData] = useState('Hello How Can I help you?');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleClick = async () => {
    if (!message) {
      setResponseData('Please type a message');
      return;
    }
    setMessage('...');
    setResponseData('Thinking...');
    axios
      .post('/api/mistral', {
        message: message
      })
      .then((response) => {
        const data = response.data;
        data.replace(
          /\n/g,
          '<br />',
          /\t/g,
          '  ',
          /\s\s/g,
          ' ',
          /<br \/>/g,
          '\n'
        );

        setResponseData(data);
        setMessage('');
      });
  };
  return (
    <div className='flex items-center justify-center p-24 dark:bg-gray-900 min-h-screen'>
      <div className='flex flex-col w-[40rem] h-auto max-h-[100vh] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'>
        <div className='flex-1 overflow-y-auto p-4'>
          {responseData && (
            <div className='flex flex-col space-y-4'>
              <p className='text-sm text-gray-300'>{responseData}</p>
            </div>
          )}
        </div>
        <div className='flex p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700'>
          <input
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            type='text'
            value={message}
            placeholder='Type a message...'
            aria-label='Type a message'
            className='flex-1 mr-4 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={handleClick}
            className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

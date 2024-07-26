'use client';

import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { ReactTyped } from 'react-typed';
import { Suspense } from 'react';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [responseData, setResponseData] = useState('');
  const [messageLog, setMessageLog] = useState<string[]>([]);
  const [responseLog, setResponseLog] = useState<string[]>([]);

  const combinedLog = [
    ...messageLog.map((msg, index) => ({
      type: 'message',
      content: msg,
      index
    })),
    ...responseLog.map((res, index) => ({
      type: 'response',
      content: res,
      index
    }))
  ];

  const sortedCombinedLog = combinedLog.sort((a, b) => a.index - b.index);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const handleClick = () => {
    setMessageLog([...messageLog, message]);
    setMessage('');
    axios
      .post('/api/mistral', {
        message: message
      })
      .then((response) => {
        const data = response.data;
        setMessage('');
        setResponseLog([...responseLog, data]);
      });
  };
  let originalMessage = (
    <ReactTyped
      showCursor={false}
      startWhenVisible={true}
      strings={['How can I assist you?']}
      typeSpeed={30}
    ></ReactTyped>
  );

  const bottom = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottom.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [sortedCombinedLog]);

  return (
    <div className='flex flex-col w-[60rem] h-[80vh] max-h-[80vh] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'>
      <div className='flex-1 overflow-y-auto p-4'>
        <div className='flex flex-col space-y-8'>
          <div className='block'>
            <p className='inline-block max-w-[50%] text-sm mb-4 p-4 border rounded-lg text-gray-300 text-left ml-2 border-gray-300 bg-gray-800'>
              {originalMessage}
            </p>
          </div>
          <Suspense fallback={<p>Thinking...</p>}>
            {sortedCombinedLog.map((log, index) => (
              <p
                key={index}
                className={`inline-block max-w-[50%] text-sm mb-4 p-4 border rounded-lg ${
                  log.type === 'response'
                    ? 'text-gray-300 text-left ml-2 border-gray-300 bg-gray-800 self-start'
                    : 'text-gray-300 text-right mr-2 border-gray-300 bg-blue-700 self-end'
                }`}
              >
                {log.type === 'response' ? (
                  <ReactTyped
                    showCursor={false}
                    strings={[log.content]}
                    typeSpeed={10}
                    onStringTyped={scrollToBottom}
                  />
                ) : (
                  log.content
                )}
              </p>
            ))}
          </Suspense>
        </div>
        <div ref={bottom}></div>
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
  );
}

import TextInput from './TextInput';

export default function Chat() {

  
  return (
    <main className='flex min-h-screen items-center justify-center p-24 dark:bg-gray-900'>
      <div className='w-full max-w-2xl h-3/4 bg-gradient-to-br from-gray-800 to-blue-900 dark:from-gray-800 dark:to-blue-900 rounded-3xl shadow-2xl shadow-blue-800/50 flex flex-col'>
        <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
          <h2 className='text-lg font-semibold text-gray-100'>Chatbot</h2>
        </div>
        <div className='flex-1 overflow-y-auto p-4'>
          {/* Chat messages will go here */}
          <p className='text-sm text-gray-300'>Hello! How can I help you?</p>
        </div>

        <div className='flex items-center justify-between p-4'>
          <TextInput />
        </div>
      </div>
    </main>
  );
}

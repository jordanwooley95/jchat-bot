import Chat from '@/components/Chat';

export default function Page() {
  return (
    <>
      <h1 className='text-4xl font-bold text-center text-blue-500 dark:text-blue-300 shadow-lg p-4'>
        Brucie Chat
      </h1>
      <Chat />
    </>
  );
}

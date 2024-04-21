import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import {
  ArrowClockwise,
  Check,
  CornersOut,
  Lightning,
  Plus,
} from 'phosphor-react';

const prompts = [
  {
    icon: <Lightning />,
    text: 'Generate content ideas',
  },
  {
    icon: <Check />,
    text: 'Fix grammatical issues',
  },
  {
    icon: <CornersOut />,
    text: 'Expand and elaborate',
  },
  {
    icon: <ArrowClockwise />,
    text: 'Rewrite',
  },
  {
    icon: <Plus />,
    text: 'Make it effective',
  },
];

const Home = () => {
  const { state } = useAuth();
  const isWindows = navigator.platform.toLowerCase().includes('win');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { user } = state;

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      if (event.ctrlKey && event.key === 'k') {
        console.log('Ctrl + K pressed');
        setIsModalOpen(!isModalOpen);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className='min-h-screen bg-gray-200 flex justify-center items-center'>
      {/* modal */}
      {isModalOpen ? (
        <div className='bg-white border border-gray-300 rounded-md w-[90%] max-w-[480px]'>
          {/* header */}
          <div className='w-full p-4 border-b flex justify-center items-center gap-4'>
            <div className='flex w-full justify-between gap-2 items-center'>
              <input
                type='text'
                className='block w-full grow p-2 border-none'
                placeholder='Write a custom prompt'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                disabled={inputValue.length === 0}
                className='p-2 px-4 disabled:bg-blue-400 bg-blue-600 text-white text-lg rounded-md'
              >
                Enter
              </button>
            </div>
          </div>

          {/* content */}
          <div className='p-4'>
            {prompts.map((prompt, i) => (
              <div
                className='flex items-center gap-4 font-medium p-4 hover:bg-gray-100 rounded-md cursor-pointer'
                key={i}
              >
                <div>{prompt.icon}</div>
                <p>{prompt.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='bg-white border border-gray-300 rounded-md w-[90%] max-w-[480px]'>
          {/* header */}
          <div className='p-4 border-b flex justify-center items-center gap-4'>
            <img
              src={user?.picture}
              className='w-14 h-14 rounded-full'
              alt=''
            />
            <div>
              <h1 className='text-xl font-semibold'>{user?.name}</h1>
              <p className='text-gray-500'>{user?.email}</p>
            </div>
          </div>
          {/* content */}
          <div className='p-8 flex flex-col justify-center items-center'>
            <button
              onClick={() => setIsModalOpen(true)}
              className='bg-blue-700 text-white p-2 px-4 rounded-md'
            >
              Click to open a menu ({isWindows ? 'Ctrl' : 'Command'} + K)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

"use client"

import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../../redux/hooks';
import { Search } from 'lucide-react';

interface SearchFormData {
  searchQuery: string;
}

export default function Header() {
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchFormData>();

  const onSearch = (data: SearchFormData) => {
    console.log("Search query:", data.searchQuery);
    // You can add additional search logic here
    // For example: dispatch search action, filter tasks, etc.

    // Optional: Reset the form after search
    // reset();
  };

  return (
    <div className='flex flex-col lg:flex-row justify-between gap-3 items-center lg:items-start text-center lg:text-left'>
      <div>
        <h2 className='text-2xl font-semibold text-gray-800'>
          Welcome, <span className='text-blue-500'>{user?.name || 'Guest'}</span>
        </h2>
        <p className='text-gray-600 mt-1'>Manage tasks efficiently.</p>
      </div>

      <div className='max-w-md'>
        <form onSubmit={handleSubmit(onSearch)} className='flex'>
          <div className='relative'>
            <input
              {...register('searchQuery', {
                required: 'Please enter a search term',
                minLength: {
                  value: 2,
                  message: 'Search term must be at least 2 characters',
                },
              })}
              type="text"
              placeholder='Search tasks...'
              className='w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-s-lg  focus:ring-0 '
            />
            <Search
              size={18}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            />
          </div>

          <button
            type='submit'
            className='px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-e-lg hover:bg-blue-700 focus:outline-none focus:ring-0 cursor-pointer'
          >
            Search
          </button>
        </form>

        {errors.searchQuery && (
          <p className='text-red-500 text-xs mt-1 absolute'>
            {errors.searchQuery.message}
          </p>
        )}
      </div>
    </div>
  );
}
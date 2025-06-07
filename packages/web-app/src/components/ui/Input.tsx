import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  className,
  error,
  ...props
}) => {
  return (
    <div className="relative">
      <input
        className={twMerge(
          'block w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-200',
          'placeholder:text-gray-400',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none',
          'hover:border-gray-300',
          error && 'border-red-300 focus:border-red-500 focus:ring-red-200',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}; 
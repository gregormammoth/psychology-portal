import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'options'> {
  options: Option[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  className,
  options,
  error,
  ...props
}) => {
  return (
    <div className="relative">
      <select
        className={twMerge(
          'block w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-200',
          'appearance-none',
          'focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none',
          'hover:border-gray-300',
          error && 'border-red-300 focus:border-red-500 focus:ring-red-200',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      >
        <option value="" className="text-gray-400">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-gray-900">
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}; 
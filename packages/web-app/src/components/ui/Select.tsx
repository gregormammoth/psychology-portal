import React from 'react';
import { Select as MuiSelect, MenuItem, FormControl, FormHelperText, SelectProps as MuiSelectProps } from '@mui/material';
import { twMerge } from 'tailwind-merge';

import theme from '../../theme';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<MuiSelectProps, 'error'> {
  options: Option[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  className,
  options,
  error,
  color = 'primary',
  ...props
}) => {
  return (
    <FormControl fullWidth error={!!error}>
      <MuiSelect
        variant="outlined"
        displayEmpty
        color="primary"
        className={twMerge('', className)}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[300],
            transition: 'border-color 0.3s',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.dark,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            borderWidth: '2px',
          },
          ...props.sx
        }}
        {...props}
      >
        <MenuItem value="" disabled>
          <em>Select an option</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && (
        <FormHelperText>{error}</FormHelperText>
      )}
    </FormControl>
  );
}; 
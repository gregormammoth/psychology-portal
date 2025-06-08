import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { twMerge } from 'tailwind-merge';

import theme from '../../theme';

interface TextareaProps extends Omit<TextFieldProps, 'error'> {
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  className,
  error,
  color = 'primary',
  ...props
}) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      multiline
      minRows={3}
      error={!!error}
      helperText={error}
      color="primary"
      className={twMerge('', className)}
      InputProps={{
        ...props.InputProps,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            borderWidth: '2px',
          },
          '&:hover fieldset': {
            borderColor: theme.palette.primary.dark,
          },
          '& fieldset': {
            borderColor: theme.palette.grey[300],
            transition: 'border-color 0.3s',
          },
        },
        '& .MuiFormLabel-root.Mui-focused': {
          color: theme.palette.primary.main,
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
        },
        ...props.sx
      }}
      {...props}
    />
  );
}; 
import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { styled } from '@mui/material/styles';

// Map our custom variants to MUI variants
const variantMapping = {
  primary: 'contained',
  secondary: 'outlined',
  outline: 'outlined',
  contained: 'contained',
};

// Map our custom sizes to MUI sizes
const sizeMapping = {
  sm: 'small' as const,
  md: 'medium' as const,
  lg: 'large' as const,
};

// Custom styled MUI Button for secondary variant
const SecondaryButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.grey[900],
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'contained';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  [x: string]: any; // For other button props
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  // For secondary variant, use our custom styled button
  if (variant === 'secondary') {
    return (
      <SecondaryButton
        size={sizeMapping[size]}
        className={className}
        {...props}
      >
        {children}
      </SecondaryButton>
    );
  }

  // For primary and outline variants, use MUI Button with appropriate variant
  return (
    <MuiButton
      variant={variantMapping[variant] as 'contained' | 'outlined' | 'text'}
      size={sizeMapping[size] as 'small' | 'medium' | 'large'}
      color={variant === 'primary' ? 'primary' : 'inherit'}
      className={className}
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 1.5,
        '&:hover': {
          backgroundColor: 'primary.dark',
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
import React from 'react';

import { VariantProps, cva } from 'class-variance-authority';

import { ButtonProps, Button as ShadcnButton } from '@/components/ui/button';

import { cn } from '@/lib/utils';

const customButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300',
  {
    variants: {
      variant: {
        default:
          'bg-purple-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90',
        destructive:
          'bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90',
        outline:
          'border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        secondary:
          'bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        ghost:
          'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
        icon: 'bg-purple-900 text-neutral-50 hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 font-medium text-lg',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type CustomButtonVariants = VariantProps<typeof customButtonVariants>;

interface CustomButtonProps extends Omit<ButtonProps, 'variant' | 'size'>, CustomButtonVariants {}

export const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <ShadcnButton
        className={cn(customButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
import { cn } from '@/lib/utils'; // Ensure you have a utility for classNames

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: 'sm' | 'md' | 'lg';
}

export function Spinner({ className, size = 'md', ...props }: SpinnerProps) {
	// Size variations for the spinner
	const sizes = {
		sm: 'h-4 w-4 border-4',
		md: 'h-6 w-6 border-4',
		lg: 'h-8 w-8 border-4'
	};

	return (
		<div
			className={cn(
				'inline-block animate-spin rounded-full border-t-transparent', // Base spinner styling
				sizes[size], // Apply size based on prop
				className // Additional classNames
			)}
			style={{
				borderColor: 'transparent', // Color for the gaps
				borderTopColor: 'gray', // Color for the visible part
				borderWidth: '4px', // Adjust border width to create a gap effect
				borderStyle: 'solid',
				boxShadow: 'inset 0 0 0 4px transparent' // Create a gap
			}}
			{...props}
		/>
	);
}

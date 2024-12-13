import React from 'react';

const ButtonLoader = ({ 
    size = 'md',
    variant = 'primary' 
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    const variantClasses = {
        primary: 'border-t-indigo-600 border-r-purple-600',
        secondary: 'border-t-indigo-500 border-r-purple-500',
        success: 'border-t-green-500 border-r-green-600',
        danger: 'border-t-red-500 border-r-red-600',
        white: 'border-t-white border-r-white'
    };

    return (
        <div 
            className={`
                ${sizeClasses[size]} 
                ${variantClasses[variant]} 
                border-4 border-transparent 
                rounded-full 
                animate-spin
            `}
        />
    );
};

export default ButtonLoader;
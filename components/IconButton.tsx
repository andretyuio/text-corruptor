
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="p-2 rounded-full text-slate-400 hover:bg-slate-700 hover:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200"
    >
      {children}
    </button>
  );
};

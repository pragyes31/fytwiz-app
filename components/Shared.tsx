
import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, LogOut } from 'lucide-react';

export const Logo = ({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) => {
  const sizes = { sm: 'w-7 h-7 p-1.5', md: 'w-10 h-10 p-2', lg: 'w-14 h-14 p-3' };
  const iconSizes = { sm: 14, md: 20, lg: 32 };
  return (
    <div className={`bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg shadow-blue-100 ${sizes[size]} ${className}`}>
      <Activity size={iconSizes[size]} className="text-white" />
    </div>
  );
};

export const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }: any) => {
  const baseStyles = "px-4 py-2 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95";
  const variants: any = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100",
    white: "bg-white text-blue-600 hover:bg-blue-50 shadow-sm"
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};

export const Header = ({ coachName, onLogout }: { coachName?: string; onLogout?: () => void }) => (
  <header className="bg-white border-b px-4 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
    <Link to="/" className="flex items-center gap-2.5">
      <Logo size="sm" />
      <span className="text-xl font-bold text-slate-800 tracking-tight">Fytwiz</span>
    </Link>
    {coachName && (
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline text-sm font-semibold text-gray-500">Coach {coachName}</span>
        <button onClick={onLogout} className="text-xs font-bold text-gray-400 hover:text-red-500 flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-slate-100">
          <LogOut size={14} /> <span>Logout</span>
        </button>
      </div>
    )}
  </header>
);

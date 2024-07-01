import { Hospital } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { APP } from '@/data/app';

interface BrandProps {
  className?: string;
}

export const Brand: React.FC<BrandProps> = ({ className }) => {
  return (
    <div
      className={`flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 ${className}`}
    >
      <Link to="/" className="flex items-center gap-2 font-semibold">
        <Hospital className="h-6 w-6" />
        <span className="font-bold uppercase text-sm lg:text-xl">{APP.NAME}</span>
      </Link>
    </div>
  );
};

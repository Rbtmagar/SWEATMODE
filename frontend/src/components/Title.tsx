// TitleAlt6.tsx
import React from 'react';

interface TitleProps {
  text1: string;
  text2: string;
}

const Title: React.FC<TitleProps> = ({ text1, text2 }) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 inline-block">
        {text1}&nbsp;{text2}
        <div className="mt-1 w-full h-[2px] bg-gray-500" />
      </h2>
    </div>
  );
};

export default Title;







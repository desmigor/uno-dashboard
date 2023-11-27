import React from 'react';

const GroupProfile = ({ name, small = false }) => {
  const randomColor = () => {
    const colors = [
      'bg-red-400',
      'bg-blue-400',
      'bg-green-400',
      'bg-yellow-400',
      'bg-purple-400',
      // Add more colors as needed
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const backgroundColor = randomColor();

  const randomTextColor = () => {
    const textColors = [
      'text-white',
      'text-gray-900',
      'text-black',
      'text-blue-900',
      'text-red-900',
      // Add more text colors as needed
    ];
    return textColors[Math.floor(Math.random() * textColors.length)];
  };

  const textClass = randomTextColor();

  const firstLetter = name ? name.charAt(0).toUpperCase() : '';

  return (
    <div className={`${small ? 'w-6 h-6' : 'w-[46px] h-[46px]'} flex items-center justify-center rounded-full ${backgroundColor}`}>
      <span className={`${small ? 'text-xs' : 'text-xl'} font-bold ${textClass}`}>{firstLetter}</span>
    </div>
  );
};

export default GroupProfile;

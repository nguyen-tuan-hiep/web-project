import React from 'react';
import { HeartIcon } from '@heroicons/react/solid';

const Image = ({ src, ...rest }) => {
  return (
    <div>
      <img src={src} {...rest} alt={''} className="rounded-xl" />
      <button>
        <HeartIcon
          className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2
        cursor-pointer absolute top-4 right-4  hover:bg-gray-300 duration-200 ease-out"
        />
      </button>
    </div>
  );
};

export default Image;

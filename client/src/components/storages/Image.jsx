import React from 'react';
import { HeartIcon } from '@heroicons/react/solid';

const Image = ({ src, ...rest }) => {
  function handleClick(event) {
    event.preventDefault();
    console.log('Button clicked');
    // Function to handle new bookmark
  }

  return (
    <div className="h-full">
      <img src={src} {...rest} alt={''} className="rounded-xl" />
      <button>
        <HeartIcon
          className="z-0 hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 ursor-pointer absolute top-4 right-4 hover:bg-gray-300 duration-200 ease-out"
          onClick={(e) => {
            handleClick(e);
          }}
        />
      </button>
    </div>
  );
};

export default Image;

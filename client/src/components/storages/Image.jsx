import React from 'react';

const Image = ({ src, ...rest }) => {

  return (
    <div className="h-full">
      <img
        src={src}
        {...rest}
        alt={''}
        className="rounded-xl"
        style={{ width: '25vw', height: '15vw' }}
      />
      <button>
      </button>
    </div>
  );
};

export default Image;

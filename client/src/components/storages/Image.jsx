import React from 'react';

const Image = ({ src, ...rest }) => {
  return (
    <div className="mb-2">
      <img
        src={src}
        {...rest}
        alt={''}
        className="aspect-[3/2] rounded-xl w-full"
      />
    </div>
  );
};

export default Image;

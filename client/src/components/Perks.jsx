import React from 'react';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import RadioOutlinedIcon from '@mui/icons-material/RadioOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const Perks = ({ selected, onChange }) => {
  const handleCbClick = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected].filter((selectedName) => selectedName !== name));
    }
  };

  return (
    <div className="grid mt-3 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      <label className="border p-4 flex rounded-2xl gap-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes('wifi')}
          name="wifi"
          onChange={handleCbClick}
        />
        <WifiIcon />

        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes('parking')}
          name="parking"
          onChange={handleCbClick}
        />
        <LocalShippingOutlinedIcon />

        <span>Free parking spot</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes('tv')}
          name="tv"
          onChange={handleCbClick}
        />
        <TvOutlinedIcon />

        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes('radio')}
          name="radio"
          onChange={handleCbClick}
        />
        <RadioOutlinedIcon />

        <span>Radio</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes('pets')}
          name="pets"
          onChange={handleCbClick}
        />
        <PetsOutlinedIcon />

        <span>Pets</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-4 items-center cursor-pointer">
        <input
          type="checkbox"
          checked={selected.includes('enterence')}
          name="enterence"
          onChange={handleCbClick}
        />
        <LoginOutlinedIcon />

        <span>Private Entrance</span>
      </label>
    </div>
  );
};

export default Perks;

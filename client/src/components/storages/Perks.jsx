import React from 'react';
import WifiIcon from '@mui/icons-material/Wifi';
import {
  BreakfastDiningOutlined,
  LocalShippingOutlined,
  LoginOutlined,
  PetsOutlined,
  PoolOutlined,
  RadioOutlined,
  TvOutlined,
} from '@mui/icons-material';
import { Checkbox, FormControlLabel } from '@mui/material';

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
    <div className="grid mt-3 gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 perk">
      <div className="border flex rounded-2xl gap-4 items-center cursor-pointer pl-6">
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className="checkbox"
                checked={selected.includes('Free Wifi')}
                name="Free Wifi"
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <WifiIcon className="mr-2" />
            </div>
          }
          label="Free Wifi"
          labelPlacement="end"
        />
      </div>

      <div className="border flex rounded-2xl gap-4 items-center cursor-pointer pl-6">
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className="checkbox"
                checked={selected.includes('Free parking')}
                name="Free parking"
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <LocalShippingOutlined className="mr-2" />
            </div>
          }
          label="Free parking"
          labelPlacement="end"
        />
      </div>

      <div className="border flex rounded-2xl gap-4 items-center cursor-pointer pl-6">
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className="checkbox"
                checked={selected.includes('Free breakfast')}
                name="Free breakfast"
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <BreakfastDiningOutlined className="mr-2" />
            </div>
          }
          label="Free breakfast"
          labelPlacement="end"
        />
      </div>

      <div className="border flex rounded-2xl gap-4 items-center cursor-pointer pl-6">
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className="checkbox"
                checked={selected.includes('Private pool')}
                name="Private pool"
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <PoolOutlined className="mr-2" />
            </div>
          }
          label="Private pool"
          labelPlacement="end"
        />
      </div>

      <div className="border flex rounded-2xl gap-4 items-center cursor-pointer pl-6">
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className="checkbox"
                checked={selected.includes('Smart TV')}
                name="Smart TV"
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <TvOutlined className="mr-3" />
            </div>
          }
          label="Smart TV"
          labelPlacement="end"
        />
      </div>

      <div className="border flex rounded-2xl gap-4 items-center cursor-pointer pl-6">
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className="checkbox"
                checked={selected.includes('Radio')}
                name="Radio"
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <RadioOutlined className="mr-3" />
            </div>
          }
          label="Radio"
          labelPlacement="end"
        />
      </div>

      <div className="border flex rounded-2xl gap-4 items-center cursor-pointer pl-6">
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className="checkbox"
                checked={selected.includes('Pets')}
                name="Pets"
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <PetsOutlined className="mr-3" />
            </div>
          }
          label="Pets"
          labelPlacement="end"
        />
      </div>

      <div className="border flex rounded-2xl gap-4 items-center cursor-pointer pl-6">
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className="checkbox"
                checked={selected.includes('Private Entrance')}
                name="Private Entrance"
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <LoginOutlined className="mr-3" />
            </div>
          }
          label="Private Entrance"
          labelPlacement="end"
        />
      </div>
    </div>
  );
};

export default Perks;

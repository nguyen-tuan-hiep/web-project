import React from 'react';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import RadioOutlinedIcon from '@mui/icons-material/RadioOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import BreakfastDiningOutlinedIcon from '@mui/icons-material/BreakfastDiningOutlined';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
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
    <div className='grid mt-3 gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <div className='border flex rounded-2xl gap-4 items-center cursor-pointer pl-6'>
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className='checkbox'
                checked={selected.includes('wifi')}
                name='wifi'
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <WifiIcon className='mr-2' />
            </div>
          }
          label='Free Wifi'
          labelPlacement='end'
        />
      </div>

      <div className='border flex rounded-2xl gap-4 items-center cursor-pointer pl-6'>
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className='checkbox'
                checked={selected.includes('parking')}
                name='parking'
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <LocalShippingOutlinedIcon className='mr-2' />
            </div>
          }
          label='Free parking'
          labelPlacement='end'
        />
      </div>

      <div className='border flex rounded-2xl gap-4 items-center cursor-pointer pl-6'>
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className='checkbox'
                checked={selected.includes('breakfast')}
                name='breakfast'
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <BreakfastDiningOutlinedIcon className='mr-2' />
            </div>
          }
          label='Free breakfast'
          labelPlacement='end'
        />
      </div>

      <div className='border flex rounded-2xl gap-4 items-center cursor-pointer pl-6'>
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className='checkbox'
                checked={selected.includes('pool')}
                name='pool'
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <PoolOutlinedIcon className='mr-2' />
            </div>
          }
          label='Private pool'
          labelPlacement='end'
        />
      </div>

      <div className='border flex rounded-2xl gap-4 items-center cursor-pointer pl-6'>
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className='checkbox'
                checked={selected.includes('tv')}
                name='tv'
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <TvOutlinedIcon className='mr-3' />
            </div>
          }
          label='TV'
          labelPlacement='end'
        />
      </div>

      <div className='border flex rounded-2xl gap-4 items-center cursor-pointer pl-6'>
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className='checkbox'
                checked={selected.includes('radio')}
                name='radio'
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <RadioOutlinedIcon className='mr-3' />
            </div>
          }
          label='Radio'
          labelPlacement='end'
        />
      </div>

      <div className='border flex rounded-2xl gap-4 items-center cursor-pointer pl-6'>
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className='checkbox'
                checked={selected.includes('pets')}
                name='pets'
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <PetsOutlinedIcon className='mr-3' />
            </div>
          }
          label='Pets'
          labelPlacement='end'
        />
      </div>

      <div className='border flex rounded-2xl gap-4 items-center cursor-pointer pl-6'>
        <FormControlLabel
          control={
            <div>
              <Checkbox
                className='checkbox'
                checked={selected.includes('enterence')}
                name='enterence'
                onChange={handleCbClick}
                sx={{
                  color: 'black',
                  '&.Mui-checked': {
                    color: 'pink',
                  },
                }}
              />
              <LoginOutlinedIcon className='mr-3' />
            </div>
          }
          label='Private Entrance'
          labelPlacement='end'
        />
      </div>
    </div>
  );
};

export default Perks;

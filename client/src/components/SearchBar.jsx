import React, { useContext, useState } from 'react';
import { PlaceContext } from '../providers/PlaceProvider';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const { setPlaces, setLoading } = useContext(PlaceContext);
  const handleSearch = async (e) => {
    clearTimeout(searchTimeout);
    setLoading(true);
    setSearchText(e.target.value);

    // debounce method
    setTimeout(async () => {
      const { data } = await axios.get(`/places/search/${searchText}`);
      setPlaces(data);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <div className="flex w-3/5 md:w-1/2 bg-gray-300 border border-gray-400 rounded-full overflow-hidden shadow-sm hover:shadow-lg hover:scale-105 transition transform duration-200 ease-out">
        <div className="grow">
          <input
            type="search"
            placeholder="Where you want to go?"
            className="w-full py-2 px-6 border-none focus:outline-none  text-sm md:text-lg"
            onChange={(e) => handleSearch(e)}
            value={searchText}
          />
        </div>
        <div className="flex  bg-blue text-white cursor-pointer">
          <button
            className="flex py-2 px-4 md:p-2 bg-primary rounded-r-full"
            onClick={handleSearch}
          >
            <SearchIcon />
            <span className="hidden md:block ml-1">Search</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;

import React, { useContext, useState } from 'react';
import { PlaceContext } from '../providers/PlaceProvider';
import axios from 'axios';
import MicIcon from '@mui/icons-material/Mic';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const { setPlaces, setLoading } = useContext(PlaceContext);
  const [isListening, setIsListening] = useState(false);

  let speech;
  if (window.webkitSpeechRecognition) {
    const SpeechRecognition = webkitSpeechRecognition;
    speech = new SpeechRecognition();
  } else {
    speech = null;
  }

  const listen = () => {
    setIsListening(!isListening);
    if (isListening) {
      speech.stop();
    } else {
      speech.start();
    }
  };

  if (speech === null) {
    return (
      <div className="app">
        <h1>
          Voice recognition is not supported by your browser, please re-try with
          a supported browser e.g. Chrome
        </h1>
      </div>
    );
  }

  const handleSearch = async (e) => {
    setLoading(true);
    const searching = () => {
      if (e.target.value === undefined || e.target.value === '') {
        if (searchText !== '' && e.type === 'click') return searchText;
        setSearchText('');
        return undefined;
      }
      setSearchText(e.target.value);
      return e.target.value;
    };
    // debounce method
    console.log(`/places/search/${searching()}`);
    const { data } = await axios.get(`/places/search/${searching()}`);
    setPlaces(data);
    setLoading(false);
  };

  speech.onresult = (event) => {
    const text = event.results[0][0].transcript.trim();
    setSearchText(text);
    handleSearch({ target: { value: text }, type: 'voice' });
  };

  return (
    <>
      <div className="flex w-3/5 md:w-1/2 border border-gray-400 rounded-full overflow-hidden shadow-sm hover:shadow-lg hover:scale-105 transition transform duration-200 ease-out">
        <div className="grow">
          <input
            id="search"
            type="search"
            placeholder="Search for a place"
            className="w-full py-2 px-6 border-none focus:outline-none  text-sm md:text-lg"
            onChange={(e) => handleSearch(e)}
            value={searchText}
          />
        </div>
        <IconButton>
          <MicIcon
            className={`microphone ${isListening && 'isListening'}`}
            onClick={listen}
          />
        </IconButton>
        <div className="flex  bg-blue text-white cursor-pointer">
          <button
            className="flex py-2 px-4 md:p-2 bg-primary hover:bg-red-700 transition rounded-r-full"
            onClick={(e) => handleSearch(e)}
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

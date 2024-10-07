import React, { useState, useEffect, useCallback } from "react";

import AutoSuggestInput from "../AutoSuggestionInput/AutoSuggestionInput";

import { cn } from "../../utils/utils";
import getCities from "../../services/getCities";
import useDebounce from "../../hooks/useDebounce";

const SearchWeather = ({
  handleOnOptionClick,
  setGeoApiErrorMessage,
  cityName,
  setCityName,
}) => {
  const [results, setResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedValue = useDebounce(cityName, 400);

  const getCityNameSuggestions = useCallback(
    async (inputValue) => {
      try {
        setGeoApiErrorMessage("");
        const data = await getCities(inputValue);

        setResults(data);
      } catch (error) {
        setGeoApiErrorMessage(
          error.response.data.message
            ? `While Fetching City Name Suggestions, ${error.response.data.message}`
            : `Error in Fetching City Name Suggestions!`
        );
        console.log("Error in Fetching city Name", error.response.data.message);
      }
    },
    [setGeoApiErrorMessage]
  );

  const handleChange = (value) => {
    setCityName(value);
    setShowSuggestions(value.trim() !== "");
  };

  useEffect(() => {
    if (debouncedValue) getCityNameSuggestions(debouncedValue);
  }, [debouncedValue, getCityNameSuggestions]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full py-4">
      <AutoSuggestInput
        setValue={setCityName}
        suggestions={results}
        onSuggestionSelect={handleOnOptionClick}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
      >
        <div>
          <div className="absolute inset-y-0 start-0 flex items-center ps-3">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            className="block w-full p-4 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 outline-none focus:outline-none focus:ring focus:border-[#19202d]	 placeholder-gray-400 text-white"
            placeholder="Search"
            required
            value={cityName}
            onChange={(e) => handleChange(e.target.value)}
          />
          <button
            type="submit"
            className={cn(
              "text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
              cityName.trim() === "" &&
                "bg-blue-600 opacity-60 cursor-not-allowed"
            )}
            disabled={cityName.trim() === ""}
            onClick={() => {
              if (cityName.trim() === "") return;
              setShowSuggestions(false);

              handleOnOptionClick(
                { value: "", label: "", latitude: "", longitude: "" },
                true
              );
            }}
          >
            Search
          </button>
        </div>
      </AutoSuggestInput>
    </div>
  );
};

export default SearchWeather;

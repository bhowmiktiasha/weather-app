import React, { useRef, useEffect, useCallback } from "react";

const AutoSuggestInput = ({
  children,
  setValue,
  suggestions,
  onSuggestionSelect,
  showSuggestions,
  setShowSuggestions,
}) => {
  const inputRef = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    },
    [setShowSuggestions]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion.label);
    setShowSuggestions(false);
    onSuggestionSelect(suggestion);
  };

  return (
    <div className="relative w-full" ref={inputRef}>
      {children}
      {showSuggestions && suggestions.length > 0 && (
        <ul
          style={{ zIndex: "1000" }}
          className="absolute left-0 w-[100%] border border-gray-300 bg-white shadow-lg rounded-lg mt-4  max-h-[300px] overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="py-[10px] px-[20px] hover:bg-gray-300 cursor-pointer"
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
      {showSuggestions && suggestions.length === 0 && (
        <div className="absolute py-[10px] px-2 z-100 left-0 w-[100%] border border-gray-300 bg-white shadow-lg rounded-lg mt-4 max-h-[300px] overflow-y-auto">
          No suggestions found.
        </div>
      )}
    </div>
  );
};

export default AutoSuggestInput;

import React, { useState, useEffect, useRef } from "react";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    const searchHistory = localStorage.getItem("searchHistory");
    if (searchHistory) {
      setSuggestions(JSON.parse(searchHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(suggestions));
  }, [suggestions]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSearchTerm = e.target.elements.search.value.trim();
    if (newSearchTerm !== "") {
      setSuggestions((prevSuggestions) => [
        newSearchTerm,
        ...prevSuggestions.filter((s) => s !== newSearchTerm),
      ]);
      setSearchTerm("");
      onSearch(newSearchTerm);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    onSearch(suggestion);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setSearchTerm("");
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <header className="flex flex-col justify-center items-center min-h-[30vh] fixed top-0 left-[50%] translate-x-[-50%] w-full z-10 bg-black">
      <h1 className="p-8 font-semibold text-4xl text-white">Flickr</h1>
      <div>
        <form ref={formRef} className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            className="text-2xl p-2 w-full border-2 border-indigo-800 capitalize"
            autoComplete="off"
          />
          <button
            type="submit"
            className="p-2 text-base bg-indigo-800 text-white cursor-pointer">
            Search
          </button>
        </form>
        {searchTerm && suggestions.length > 0 && (
          <ul
            className="absolute z-10 w-full bg-white border-2 border-indigo-800"
            style={{
              width: formRef.current.offsetWidth,
              backgroundColor: "white",
            }}>
            {suggestions
              .filter((s) => s.includes(searchTerm.toLowerCase()))
              .map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 cursor-pointer hover:bg-gray-200 capitalize">
                  {suggestion}
                </li>
              ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;

import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { StoreContext } from "../contexts/StoreContext";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const { allproduct } = useContext(StoreContext);
  const [randomProducts, setRandomProducts] = useState([]);
  const inputRef = useRef(null); 

  useEffect(() => {
    inputRef.current?.focus(); 
  }, []);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!Array.isArray(allproduct)) return;

    const saved = localStorage.getItem("randomProducts");
    const savedTime = localStorage.getItem("randomProductsTime");
    const now = Date.now();

    const ONE_HOUR = 60 * 60 * 1000;

    if (saved && savedTime && now - parseInt(savedTime) < ONE_HOUR) {
      setRandomProducts(JSON.parse(saved));
    } else {
      const shuffled = [...allproduct].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 8);
      setRandomProducts(selected);

      localStorage.setItem("randomProducts", JSON.stringify(selected));
      localStorage.setItem("randomProductsTime", now.toString());
    }
  }, [allproduct]);

  useEffect(() => {
    if (query.trim() !== "") {
      const filtered = allproduct
        .filter((product) => {
          const q = query.toLowerCase();
          return (
            product.name?.toLowerCase().includes(q) ||
            product.categoryId?.toLowerCase().includes(q) ||
            product.sub_category?.toLowerCase().includes(q) ||
            product.sub_category2?.toLowerCase().includes(q) ||
            product.description?.toLowerCase().includes(q) ||
            (Array.isArray(product.details) &&
              product.details.some((d) => d?.toLowerCase().includes(q)))
          );
        })
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, allproduct]);

  const handleSelect = (itemName) => {
    setQuery(itemName);
    setShowSuggestions(false);
    console.log("cllss");
    navigate(`/all-produt/${itemName}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      handleSelect(query);
    }
  };

  return (
    <div>
      <div className="w-full lg:px-70 px-3 mt-6">
        <div className="w-full border-1 border-gray-300 py-1 rounded-sm">
          <div className="flex items-center px-2 ml-1 justify-between">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for products..."
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              type="text"
              className="w-full outline-none flex items-center h-7"
            />
            <IoSearch
              onClick={() => query.trim() && handleSelect(query)}
              className="cursor-pointer text-gray-500 hover:bg-gray-100 px-2 py-2 rounded-full text-[37px]"
            />
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute bg-white min-w-[65vw] max-w-[90vw] mt-1 rounded-md shadow-md z-10">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onMouseDown={() => {
                    handleSelect(item.sub_category2);
                  }}
                  className="px-4 text-[13px] text-gray-800 py-3 h-[35px] flex items-center hover:bg-gray-100 cursor-pointer line-clamp-1"
                >
                  <div className="flex gap-x-2">
                    <img src={item.image[0]} className="w-10" alt="" />
                    <p>{item.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="px-3">
        <h1 className="my-2 text-gray-700 font-medium text-[20px]">
          Popular Products
        </h1>
        <div className="w-full grid md:grid-cols-8 grid-cols-3 gap-3">
          {Array.isArray(randomProducts) && randomProducts.length > 0 ? (
            randomProducts.map((item, index) => (
              <div
                key={index}
                className="border-1 border-gray-400 rounded-sm py-2 px-2 items-center flex flex-col"
              >
                <img src={item.image[0]} className="w-30" alt="" />
                <div className="flex items-center justify-center flex-col font-sans mt-[5px]">
                  <p className="text-[15px]">{item.categoryId}</p>
                  <p className="text-sm text-gray-500">{item.sub_category2}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Loading popular products...</p>
          )}
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default SearchPage;

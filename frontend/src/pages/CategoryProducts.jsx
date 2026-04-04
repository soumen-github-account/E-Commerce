import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productData } from "../assets/data";
import HeaderSearch from "../components/HeaderSearch";
import Footer from "../components/Footer";
import { IoStarHalfSharp, IoStarSharp } from "react-icons/io5";
import { StoreContext } from "../contexts/StoreContext";

const CategoryProducts = () => {
  const { allproduct } = useContext(StoreContext);
  const { category } = useParams();
  const navigate = useNavigate();

  const [productfiltered, setProductfiltered] = useState([]);
  const [sizeFilter, setSizeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [unitFilter, setUnitFilter] = useState("");

  useEffect(() => {
    if (Array.isArray(allproduct)) {
      const filtered = allproduct.filter(
        (product) => product.categoryId === category,
      );
      setProductfiltered(filtered);
    }
  }, [allproduct, category]);

  const standardSizeOrder = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "28",
    "30",
    "32",
    "34",
    "36",
    "38",
    "40",
    "42",
    "44",
  ];
  const sizes = productfiltered.length
    ? [
        ...new Set(
          productfiltered.flatMap((p) => (Array.isArray(p.type) ? p.type : [])),
        ),
      ].sort((a, b) => {
        const indexA = standardSizeOrder.indexOf(a);
        const indexB = standardSizeOrder.indexOf(b);
        return (
          (indexA === -1 ? Infinity : indexA) -
          (indexB === -1 ? Infinity : indexB)
        );
      })
    : [];

  const allPrices = productfiltered.map((p) => p.price?.[0]).filter(Boolean);
  let priceRanges = [];
  if (allPrices.length > 0) {
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    const step = 100;

    for (let i = Math.floor(min / step) * step; i <= max; i += step) {
      priceRanges.push(`${i}-${i + step - 1}`);
    }
  }

  const allSubCategories = [
    ...new Set(productfiltered.map((p) => p.sub_category).filter(Boolean)),
  ];

  const filteredProducts = productfiltered.filter((product) => {
    const sizeMatch =
      !sizeFilter ||
      (Array.isArray(product.type) && product.type.includes(sizeFilter));
    const categoryMatch =
      !categoryFilter || product.sub_category === categoryFilter;
    const priceMatch = (() => {
      if (!priceFilter) return true;
      const [min, max] = priceFilter.split("-").map(Number);
      return product.price[0] >= min && product.price[0] <= max;
    })();

    return sizeMatch && priceMatch && categoryMatch;
  });
  return (
    <div>
      <HeaderSearch />
      <div className="px-2 flex ml-5 my-3 gap-4 items-center flex-wrap">
        <p className="md:text-lg font-medium text-[14px]">
          Filter <span className="text-neutral-700 text-md">Product :</span>
        </p>

        {Array.isArray(filteredProducts) && (
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="rounded-md px-3 py-1 text-sm bg-gray-100"
          >
            <option value="">{filteredProducts?.[0]?.unit}</option>
            {sizes.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        )}

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="rounded-md px-3 py-1 text-sm bg-gray-100"
        >
          <option value="">Price</option>
          {priceRanges.map((range, i) => (
            <option key={i} value={range}>
              {range.replace("-", " - ")}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md px-3 py-1 text-sm bg-gray-100"
        >
          <option value="">Sub-Category</option>
          {allSubCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSizeFilter("");
            setPriceFilter("");
          }}
          className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm"
        >
          Clear Filters
        </button>
      </div>
      <div className="px-6 h-[86vh] overflow-scroll scroll-hide">
        <div className="grid w-full lg:grid-cols-7 md:grid-cols-4 grid-cols-2 gap-4">
          {Array.isArray(filteredProducts) &&
            filteredProducts.map((item, index) => (
              <div
                className="w-40 max-w-50 bg-neutral-100 p-2"
                key={index}
                onClick={() => navigate(`/produt-page/${item._id}`)}
              >
                <div className="w-full relative">
                  <img
                    src={item.image[0]}
                    className="w-full rounded-md"
                    alt=""
                  />
                </div>
                <div className="flex items-start flex-col">
                  <p className="font-bold text-gray-900 mt-1 line-clamp-2">
                    {item.name}
                  </p>
                  <div className="flex gap-1 text-yellow-500">
                    {[1, 2, 3, 4].map((item, index) => (
                      <IoStarSharp key={index} />
                    ))}
                    <IoStarHalfSharp />
                  </div>
                  <p className="text-blue-900 text-sm font-sans">
                    {item.discount}% off
                  </p>
                  <span className="flex gap-4 items-center">
                    <p className="font-sans text-[14px]">₹ {item.price[0]}</p>
                    <p className="text-[12px]">Free Delevary</p>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryProducts;

import React from 'react';
import { FaStar } from 'react-icons/fa';

const reviewData = [
  { label: 'Excellent', color: 'bg-green-500', width: 'w-5/6' },
  { label: 'Good', color: 'bg-green-400', width: 'w-3/5' },
  { label: 'Average', color: 'bg-yellow-400', width: 'w-2/5' },
  { label: 'Avg-below', color: 'bg-orange-400', width: 'w-1/4' },
  { label: 'Poor', color: 'bg-red-500', width: 'w-1/6' },
];

const CustomerReview = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="font-semibold text-lg mb-3">Customer Review</h2>
      <div className="flex items-center mb-3">
        <div className="flex text-yellow-400 text-xl mr-2">
          {[...Array(4)].map((_, i) => <FaStar key={i} />)}
          <FaStar className="text-gray-300" />
        </div>
        <span className="text-gray-700 font-medium ml-2">4.0 out of 5 star</span>
      </div>
      {reviewData.map((item, i) => (
        <div key={i} className="mb-2">
          <p className="text-sm text-gray-600 mb-1">{item.label}</p>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className={`${item.width} ${item.color} h-full rounded`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerReview;

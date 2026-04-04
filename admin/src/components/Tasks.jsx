import React from "react";

const tasks = [
  { title: "Smart Phone buy with back-part", time: "3d ago" },
  { title: "Purchase report", time: "4d ago" },
  { title: "New Product Add", time: "5d ago" },
  { title: "Product tag Add", time: "5d ago" },
  { title: "Product Variable & Price Set", time: "5d ago" },
];

const Tasks = () => {
  return (
    <div className="bg-white shadow rounded p-4 col-span-1 lg:col-span-1">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">Last Month Task</h2>
        <button className="text-blue-600 text-sm hover:underline">
          See all
        </button>
      </div>
      <div className="flex space-x-4 text-sm mb-3">
        <span className="text-blue-600 font-medium cursor-pointer">All</span>
        <span className="text-gray-400 cursor-pointer">Delivered</span>
        <span className="text-gray-400 cursor-pointer">Order</span>
      </div>
      <ul className="space-y-2">
        <li className="text-gray-700 font-semibold">
          #New Category Add{" "}
          <span className="text-sm text-gray-400 float-right">last week</span>
        </li>
        {tasks.map((task, index) => (
          <li key={index} className="text-sm text-gray-600 border-b py-1">
            {task.title}
            <span className="float-right text-gray-400">{task.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;

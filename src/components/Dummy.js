import React from "react";
// import Navbar from "./navbar";
// import Sidebar from "./sidebar";
import { TbFilter } from "react-icons/tb";
import { FiChevronDown } from "react-icons/fi";
import { FiRefreshCw } from "react-icons/fi";
import Sidebar from "./Sidebar";

const Log = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">

        <div className="p-8 bg-gray-100">
          <h1 className="text-2xl font-semibold mb-6">History:</h1>

          <div className="flex items-center max-w-5xl justify-between bg-white rounded-lg shadow-md border border-gray-200 px-4 mx-5">
            {/* Filter Icon */}
            <div className="flex items-center p-4 border-r pr-4">
              <TbFilter className="text-gray-600 text-2xl" />
            </div>
            <div className="flex items-center p-4 border-r pr-4">
              <span className="text-gray-700 font-medium">Filter By</span>
            </div>
            <div className="flex items-center p-3 gap-2 border-r">
              <span className="text-gray-700 font-medium">Date</span>
              <FiChevronDown className="text-gray-600 m-2" />
            </div>
            <div className="flex items-center p-3 gap-2 border-r">
              <span className="text-gray-700 font-medium">User Name</span>
              <FiChevronDown className="text-gray-600 m-2" />
            </div>
            <div className="flex items-center p-3 gap-2 border-r">
              <span className="text-gray-700 font-medium">Activity Type</span>
              <FiChevronDown className="text-gray-600 m-2" />
            </div>
            <div className="flex items-center p-3 gap-2 border-r">
              <span className="text-gray-700 font-medium">Customer Name</span>
              <FiChevronDown className="text-gray-600 m-2" />

            </div>

            {/* Reset Filter */}
            <div className="flex items-center text-red-600 font-medium cursor-pointer p-4">
              <FiRefreshCw className="text-red-600 m-1" />
              <span>Reset Filter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
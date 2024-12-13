import React from 'react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-900">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-75 rounded-full animate-ping"></div>
        <div className="relative flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-2xl overflow-hidden">
          <div className="w-16 h-16 border-4 border-transparent border-t-indigo-600 border-r-purple-600 rounded-full animate-spin"></div>
          <div className="absolute w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="absolute bottom-10 text-white font-semibold tracking-wider text-lg animate-bounce">
        Loading...
      </div>
    </div>
  );
};

export default PageLoader;
import React from 'react';

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center h-48">
    <div className="w-16 h-16 border-4 border-t-transparent border-gray-400 rounded-full animate-spin"></div>
  </div>
);

export default Spinner;
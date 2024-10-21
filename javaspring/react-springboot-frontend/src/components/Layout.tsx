import React from 'react';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4 bg-white shadow-md">
        {children}
      </div>
    </div>
  );
};

export default Layout;
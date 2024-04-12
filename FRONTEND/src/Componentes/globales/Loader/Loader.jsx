import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-20 w-20  border-t-4 border-b-4 border-black dark:border-white"></div>
      <p className="text-lg font-bold text-black dark:text-white mt-8">Cargando...</p>
    </div>
  );
};

export default Loader;
















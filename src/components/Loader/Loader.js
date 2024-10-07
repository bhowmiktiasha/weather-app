import React, { useEffect, useState } from "react";

const Loader = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  // if not checking if component mounted it gives document not defined error
  return mounted ? (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-800 opacity-75 flex flex-col items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      <h2 className="text-center text-white text-3xl font-semibold">
        Loading...
      </h2>
      <p className="w-1/3 text-center text-white text-xl">Fetching Weather!</p>
    </div>
  ) : null;
};

export default Loader;

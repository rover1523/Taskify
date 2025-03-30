import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[var(--primary)]" />
    </div>
  );
};

export default LoadingSpinner;

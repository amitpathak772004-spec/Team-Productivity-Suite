const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-400 border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;

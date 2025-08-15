// ErrorAlert.jsx
// Matches the error alert section from the JSON design
import React from "react";

const ErrorAlert = ({ message }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
    <div className="flex items-center space-x-2">
      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">!</span>
      </div>
      <span className="text-red-700 font-medium">Error</span>
    </div>
    <p className="text-red-700 mt-1">{message}</p>
  </div>
);

export default ErrorAlert;

/**
 * ErrorAlert component - displays error notifications
 * @param message Error message to display
 */
import React from 'react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" role="alert" aria-live="assertive">
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

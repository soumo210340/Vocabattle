import { useState, useCallback } from 'react';

export const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const handleError = useCallback((error) => {
    let errorMessage = 'An unexpected error occurred.';

    if (error.response) {
      // Server responded with error
      switch (error.response.status) {
        case 400:
          errorMessage = error.response.data.error || 'Invalid request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Authentication failed. Please log in again.';
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 422:
          errorMessage = 'Validation failed. Please check your input.';
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = error.response.data.error || 'An error occurred while processing your request.';
      }
    } else if (error.request) {
      // Request was made but no response
      errorMessage = 'Unable to connect to the server. Please check your internet connection.';
    } else {
      // Other errors
      errorMessage = error.message || 'An unexpected error occurred.';
    }

    setError(errorMessage);

    // Auto-clear error after 5 seconds
    setTimeout(() => setError(null), 5000);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { error, handleError, clearError };
};

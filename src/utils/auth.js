// src/utils/auth.js

export const isTokenExpired = () => {
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    if (!tokenTimestamp) return true; // No timestamp found, assume expired
  
    const now = new Date().getTime();
    const age = now - parseInt(tokenTimestamp, 10);
  
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  
    if (age > maxAge) {
      // If token is expired, remove token and timestamp
      removeToken();
      return true; // Token is expired
    }
  
    return false; // Token is still valid
  };
  
  export const setToken = (token) => {
    const timestamp = new Date().getTime();
    localStorage.setItem('token', token);
    localStorage.setItem('tokenTimestamp', timestamp.toString());
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
  };
  
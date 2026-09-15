import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import refreshToken from './TokenService';

const apiRequest = async (url, method = 'GET', data = null) => {
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  };

  if (data instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await axios({
      url,
      method,
      headers,
      data,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Access token has expired, attempt to refresh the token
      await refreshToken();
      // Retry the original request with the new access token
      const newAccessToken = localStorage.getItem('accessToken');
      headers['Authorization'] = `Bearer ${newAccessToken}`;
      const retryResponse = await axios({
        url,
        method,
        headers,
        data,
      });
      return retryResponse.data;
    } else {
      // Handle other errors
      console.error('API request failed', error);
      throw error;
    }
  }
};

export default apiRequest;

export const getLoggedUserId = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('No access token found');
  }
  const decodedToken = jwtDecode(accessToken);
  return decodedToken.UserID; 
};

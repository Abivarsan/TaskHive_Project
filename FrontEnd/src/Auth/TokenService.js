// src/tokenService.js
import axios from 'axios';

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post('http://localhost:5228/api/Auth/refresh', {
      RefreshToken: refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  } catch (error) {
    console.error('Token refresh failed', error.response ? error.response.data.message : error.message);
    // Optionally, handle the refresh failure (e.g., log out the user or redirect to login)
  }
};

export default refreshToken;

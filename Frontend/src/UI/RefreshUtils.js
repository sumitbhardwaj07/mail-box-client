import { logout } from "../store/authReducer";
import { Base_URL } from "./Helper";


const fetchWithRefreshToken = async (url, options, dispatch, navigate) => {
    let accessToken = localStorage.getItem('accessToken');
     
    if (!accessToken) {
      console.error('No access token found');
      dispatch(logout());
      navigate("/auth");
      return;
    }
  
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
    };
  
    let response = await fetch(url, options);
  
    if (response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        console.error('No refresh token found');
        dispatch(logout());
        navigate("/auth");
        return;
      }
  
      const refreshResponse = await fetch(`${Base_URL}/api/v1/users/refreshtoken`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
  
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        localStorage.setItem('accessToken', data.accessToken);
        options.headers['Authorization'] = `Bearer ${data.accessToken}`;
        response = await fetch(url, options); // Retry original request
      } else {
        console.error("Failed to refresh token");
        dispatch(logout());
        navigate("/auth");
        return;
      }
    }
  
    return response;
  };
  export default fetchWithRefreshToken;
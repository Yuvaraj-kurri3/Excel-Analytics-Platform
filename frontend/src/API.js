import axios from "axios";
axios.defaults.withCredentials = true;
// const BASE_URL = "http://localhost:5000"; // Change this to your backend URL if needed
const BASE_URL = "https://excel-analytics-backend.onrender.com";


export const login = (data) => {
  return axios.post(`${BASE_URL}/api/auth/login`, data,{
    withCredentials: true
  });
};

export const signup = (data) => {
  return axios.post(`${BASE_URL}/api/auth/signup`, data);
};

export const forgotPassword = (email) => {
  return axios.post(`${BASE_URL}/api/auth/forgot`, {email});
};
// Check if user is logged in
export const isLoggedIn = () => {
  return axios.get(`${BASE_URL}/api/auth/check-login`,{
    withCredentials: true
  });
};

//logout 
export const logoutAPI = () => {
  return axios.post(`${BASE_URL}/api/auth/logout`,{
    withCredentials: true
  });
}
export const verifyOtp = (otp) => {
  return axios.post(`${BASE_URL}/api/auth/verify-otp`, {otp}, {
    withCredentials: true
  });
};
export const resetPassword = (newpassword) => {
  return axios.post(`${BASE_URL}/api/auth/reset-password`, {newpassword});
};

export const Upload = (formData) => {
  return axios.post(`${BASE_URL}/api/auth/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true
  });
};



 

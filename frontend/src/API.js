import axios from "axios";
// Removed incorrect import from backend controller
axios.defaults.withCredentials = true;
const BASE_URL = "http://localhost:5000"; // Change this to your backend URL if needed
// const BASE_URL = "https://excel-analytics-backend.onrender.com";


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

// Only one getChartHistory export should exist. If you want to fetch all chart history, use:
export const getChartHistory = () => {
  return axios.get(`${BASE_URL}/api/chart-history`, {
    withCredentials: true
  });
};
export const saveChartHistory = (data) => {
  return axios.post(`${BASE_URL}/api/chart-history`, data, {
    withCredentials: true
  });
}

export const deleteChartHistory = (id) => {
  return axios.delete(`${BASE_URL}/api/chart-history/${id}`, {
    withCredentials: true
  });
}

export const getname = () => {
  return axios.get(`${BASE_URL}/api/chart-histroy/name`, {
    withCredentials: true
  });
};

 

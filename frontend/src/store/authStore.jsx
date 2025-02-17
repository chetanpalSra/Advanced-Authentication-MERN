import {create} from "zustand";
import axios from "axios";


const API_URL = import.meta.env.MODE === "development"?"http://localhost:5007/api/auth": "/api/auth";

axios.defaults.withCredentials = true;
//The line axios.defaults.withCredentials = true; is used to configure Axios so that it includes cookies or other credentials (like HTTP authentication) with cross-site requests.When we talk about "other credentials" in the context of axios.defaults.withCredentials = true, it primarily refers to mechanisms that allow the client to authenticate itself with the server or provide session-related information. These can include:

 
const useAuthStore = create((set) => ({
 user: null,
 isAuthenticated: false,
 error: null,
 isLoading: false,
 isCheckingAuth: true,
 message: null,
 signup: async(email,password,name) =>{
    set({isLoading: true, error: null});
    try {
        const response = await axios.post(`${API_URL}/signup`,{email,password,name});
        set({user:response.data.user,isAuthenticated: true,isLoading: false })
    } catch (error) {
        set({error: error.response?.data?.message || "Error signing up",isLoading: false});
        throw error;
    }
 },
 login: async(email,password)=>{
     set({isLoading: true,error: null});
     try {
        const response = await axios.post(`${API_URL}/login`,{email,password});
        set({user: response.data.user,isAuthenticated: true, isLoading: false,error: null});
     } catch (error) {
        set({error: error.response?.data?.message || 'Error logging in',isLoading: false});
        throw error;
     }
 },
 logout: async()=>{
    set({isLoading: true, error: null});
    try {
        const response = await axios.post(`${API_URL}/logout`);
        set({user:null,isAuthenticated: false,isLoading: false,error: null })
    } catch (error) {
        set({error: error.response.data.message || "Error logging out",isLoading: false});
        throw error;
    }
    
 },
 verifyEmail: async(code)=>{
    set({isLoading: true, error: null});
    try {
        const response = await axios.post(`${API_URL}/verify-Email`,{code});
        set({user:response.data.user,isAuthenticated: true,isLoading: false })
    } catch (error) {
        set({error: error.response.data.message || "Error signing up",isLoading: false});
        throw error;
    }
 },
 checkAuth: async()=>{
    await new Promise((resolve)=>setTimeout(resolve,2000));
    set({isCheckingAuth: true, error: null});
    try {
        const response = await axios.get(`${API_URL}/check-auth`);
        set({user:response.data.user,isAuthenticated: true,isCheckingAuth: false })
    } catch (error) {
        set({error: null,isCheckingAuth: false,isAuthenticated: false});
        throw error;
    }
 },
 forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.post(`${API_URL}/forgot-password`, { email });
        set({ message: response.data.message, isLoading: false });
    } catch (error) {
        set({
            isLoading: false,
            error: error.response.data.message || "Error sending reset password email",
        });
        throw error;
    }
},
resetPassword: async(token,password)=>{
    set({ isLoading: true, error: null });
    try {
        const response = await axios.post(`${API_URL}/reset-password/${token}`, {password});
        set({ message: response.data.message, isLoading: false });
    } catch (error) {
        set({
            isLoading: false,
            error: error.response.data.message || "Error resetting password",
        });
        throw error;
    }
}
}))

export default useAuthStore;

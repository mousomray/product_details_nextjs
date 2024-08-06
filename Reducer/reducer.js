import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; //createAsyncThunk handle asynconomous function 
import axiosInstance from "@/pages/api/api";
import { endpoints } from "@/Endpoints/endpoint";


// Call Api for Product
export const product = createAsyncThunk("product", async (_, { rejectWithValue }) => {
    try {
        const apiurl = `${endpoints.cms.productlist}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Product List", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching Product List data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Single Product
export const singleproduct = createAsyncThunk("singleproduct", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `${endpoints.cms.productlist}/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Single Product", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching Single Product data", error);
        return rejectWithValue(error.response.data);
    }
});


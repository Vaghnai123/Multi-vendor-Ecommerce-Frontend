/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const customer_register = createAsyncThunk(
    'auth/customer_register',
    async(info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/customer-register', info)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const verify_email = createAsyncThunk(
    'auth/verify_email',
    async(info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/customer-verification', info)
            localStorage.setItem('customerToken', data.token)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const resend_otp = createAsyncThunk(
    'auth/resend_otp',
    async(info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/customer/resend-otp', info)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const customer_login = createAsyncThunk(
    'auth/customer_login',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/customer/customer-login',info)
            localStorage.setItem('customerToken',data.token)
           // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const customer_logout = createAsyncThunk(
    'auth/customer_logout',
    async(_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get('/customer/logout')
            localStorage.removeItem('customerToken') // Token delete
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const decodeToken = (token) => {
    if (token) {
        const userInfo = jwtDecode(token)
        return userInfo
    } else {
        return ''
    }
}
// End Method 

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        loader: false,
        userInfo : decodeToken(localStorage.getItem('customerToken')),
        errorMessage: '',
        successMessage: '',
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(customer_register.pending, (state) => {
                state.loader = true;
            })
            .addCase(customer_register.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(customer_register.fulfilled, (state, { payload }) => {
                const userInfo = decodeToken(payload.token)
                state.successMessage = payload.message;
                state.loader = false;
                state.userInfo = userInfo
            })
            .addCase(verify_email.pending, (state) => {
                state.loader = true;
            })
            .addCase(verify_email.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.loader = false;
            })
            .addCase(verify_email.fulfilled, (state, { payload }) => {
                const userInfo = decodeToken(payload.token)
                state.successMessage = payload.message;
                state.loader = false;
                state.userInfo = userInfo
            })
            .addCase(resend_otp.pending, (state) => { state.loader = true; })

            .addCase(resend_otp.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
            })
            .addCase(resend_otp.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
            })
            .addCase(customer_login.pending, (state) => {
            state.loader = true;
            })
            .addCase(customer_login.rejected, (state, { payload }) => {
            state.errorMessage = payload.error;
            state.loader = false;
            })
            .addCase(customer_login.fulfilled, (state, { payload }) => {
            const userInfo = decodeToken(payload.token)
            state.successMessage = payload.message;
            state.loader = false;
            state.userInfo = userInfo
            })
            .addCase(customer_logout.fulfilled, (state, { payload }) => {
                state.userInfo = ""  
                state.successMessage = payload.message
            })
    }
})
export const { messageClear } = authReducer.actions
export default authReducer.reducer
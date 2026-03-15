import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

// 1. Add to Card
export const add_to_card = createAsyncThunk(
    'card/add_to_card',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/home/product/add-to-card', info)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// 2. Get Card Products
export const get_card_products = createAsyncThunk(
    'card/get_card_products',
    async (userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/product/get-card-product/${userId}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// 3. Delete Card Product
export const delete_card_product = createAsyncThunk(
    'card/delete_card_product',
    async (card_id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/home/product/delete-card-product/${card_id}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// 4. Quantity Increment
export const quantity_inc = createAsyncThunk(
    'card/quantity_inc',
    async (card_id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/home/product/quantity-inc/${card_id}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// 5. Quantity Decrement
export const quantity_dec = createAsyncThunk(
    'card/quantity_dec',
    async (card_id, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.put(`/home/product/quantity-dec/${card_id}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const apply_coupon = createAsyncThunk(
    'card/apply_coupon',
    async ({ couponCode, currentPrice }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/home/product/apply-coupon', { couponCode, currentPrice })
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const add_to_wishlist = createAsyncThunk(
    'wishlist/add_to_wishlist',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/home/product/add-to-wishlist',info) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 


export const get_wishlist_products = createAsyncThunk(
    'wishlist/get_wishlist_products',
    async (userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/home/product/get-wishlist-products/${userId}`)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const remove_wishlist = createAsyncThunk(
    'wishlist/remove_wishlist',
    async(wishlistId, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.delete(`/home/product/remove-wishlist-product/${wishlistId}`) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 




export const cardReducer = createSlice({
    name: 'card',
    initialState: {
        card_products: [],
        card_product_count: 0,
        buy_product_item: 0,
        wishlist_count: 0,
        wishlist: [],
        price: 0,
        errorMessage: '',
        successMessage: '',
        shipping_fee: 0,
        outofstock_products: [],
        loader: false,
        coupon_price: 0 
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
        reset_count: (state) => {
            state.card_product_count = 0
            state.wishlist_count = 0
        },
        reset_coupon: (state) => {
            state.coupon_price = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            // Add to Card
            .addCase(add_to_card.pending, (state) => {
                state.loader = true
            })
            .addCase(add_to_card.rejected, (state, { payload }) => {
                state.errorMessage = payload.error
                state.loader = false
            })
            .addCase(add_to_card.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message
                state.card_product_count = state.card_product_count + 1
                state.loader = false
            })

            // Get Card Products
            .addCase(get_card_products.pending, (state) => {
                state.loader = true
            })
            .addCase(get_card_products.fulfilled, (state, { payload }) => {
                state.card_products = payload.card_products
                state.price = payload.price
                state.card_product_count = payload.card_product_count
                state.shipping_fee = payload.shipping_fee
                state.outofstock_products = payload.outOfStockProduct
                state.buy_product_item = payload.buy_product_item
                state.loader = false
            })

            // Delete Card Product
            .addCase(delete_card_product.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message
            })

            // Quantity Increment
            .addCase(quantity_inc.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message
            })

            // Quantity Decrement
            .addCase(quantity_dec.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message
            })

            .addCase(apply_coupon.fulfilled, (state, { payload }) => {
                state.successMessage = payload.message;
                state.coupon_price = payload.discountAmount; 
            })
            .addCase(apply_coupon.rejected, (state, { payload }) => {
                state.errorMessage = payload.error;
                state.coupon_price = 0; 
            })
            .addCase(add_to_wishlist.rejected, (state, { payload }) => {
            state.errorMessage = payload.error; 
            })
            .addCase(add_to_wishlist.fulfilled, (state, { payload }) => { 
            state.successMessage = payload.message; 
            state.wishlist_count = state.wishlist_count > 0 ? state.wishlist_count + 1 : 1      
            })
            .addCase(get_wishlist_products.fulfilled, (state, { payload }) => { 
            state.wishlist = payload.wishlists; 
            state.wishlist_count = payload.wishlistCount 
            })
            .addCase(remove_wishlist.fulfilled, (state, { payload }) => { 
            state.successMessage = payload.message; 
            state.wishlist = state.wishlist.filter(p => p._id !== payload.wishlistId); 
            state.wishlist_count = state.wishlist_count - 1
            })
    }
})

export const { messageClear, reset_count, reset_coupon } = cardReducer.actions
export default cardReducer.reducer
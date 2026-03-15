import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base_url = 'http://localhost:5000';

export const get_blogs = createAsyncThunk(
    'blog/get_blogs',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.get(`${base_url}/api/blog-get`);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_blog_details = createAsyncThunk(
    'blog/get_blog_details',
    async (slug, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await axios.get(`${base_url}/api/blog-get/${slug}`);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const blogReducer = createSlice({
    name: 'blog',
    initialState: {
        blogs: [],
        blog: {}, 
        loader: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(get_blogs.pending, (state) => {
                state.loader = true;
            })
            .addCase(get_blogs.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.blogs = payload.blogs;
            })
            .addCase(get_blog_details.pending, (state) => {
                state.loader = true;
            })
            .addCase(get_blog_details.fulfilled, (state, { payload }) => {
                state.loader = false;
                state.blog = payload.blog;
            });
    }
});

export default blogReducer.reducer;
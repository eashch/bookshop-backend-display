import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ELoadingStatus, IBookInfo, IBookInfoSlice, ICaterogy, IUser } from './types';

const initialState = { 
    books: [],
    loadingStatus: ELoadingStatus.LOADING,
    categories: [],
    token: '',
    category: 'Architecture'
} as IBookInfoSlice;

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setAll(state, action: PayloadAction<IBookInfo[]>) {
            state.books = action.payload;
        },
        appendBooks(state, action: PayloadAction<IBookInfo[]>) {
            state.books = [...state.books, ...action.payload];
        },
        setAllCategories(state, action: PayloadAction<ICaterogy[]>) {
            state.categories = action.payload;
        },
        appendCategories(state, action: PayloadAction<ICaterogy[]>) {
            state.categories = [...state.categories, ...action.payload];
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },
        setLoadingStatus(state, action: PayloadAction<ELoadingStatus>) {
            state.loadingStatus = action.payload;
        },
        setCategory(state, action: PayloadAction<string>) {
            state.category = action.payload;
        }
    },
});

export const { 
    setAll,
    appendBooks,
    setAllCategories,
    appendCategories,
    setToken,
    setUser,
    setLoadingStatus,
    setCategory
} = booksSlice.actions
export default booksSlice.reducer
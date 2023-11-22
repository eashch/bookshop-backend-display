import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingStatus, setAll, setAllCategories } from './booksSlice';
import { RootState } from './reduxStore';
import { API_PATH, ELoadingStatus } from './types';
import Layout from './Layout/Layout';
import Loader from './Loader/Loader';
import MainPage from './MainPage/MainPage';
import UserPage from './UserPage/UserPage';

function App() {
    const dispatch = useDispatch();
    const loadingStatus = useSelector((state: RootState) => state.loadingStatus);


    const loadFirstPageCategories = async () => {
        axios.get(API_PATH + '/api/v1/categories', {
            params: {
              perPage: 1,
              page: 1
            },
        }).then((response: any) => {
            dispatch(setAllCategories(response.data));
        }).catch((error) => {
            console.error(error);
        });
    }

    const loadFirstPageBooks = async () => {
        axios.get(API_PATH + '/api/v1/books', {
            params: {
              perPage: 1,
              page: 1,
              category: "Art"
            },
        }).then((response: any) => {
            dispatch(setAll(response.data));
            dispatch(setLoadingStatus(ELoadingStatus.LOADED));
        }).catch((error) => {
            console.error(error);
            dispatch(setLoadingStatus(ELoadingStatus.ERROR));
        });
    }

    useEffect(() => {
        loadFirstPageBooks();
        loadFirstPageCategories();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={loadingStatus === ELoadingStatus.LOADED 
                        ? <MainPage /> : <Loader/>} />
                    <Route path="user" element={loadingStatus === ELoadingStatus.LOADED 
                        ? <UserPage /> : <Loader/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import './MainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reduxStore';
import { API_PATH, IBookInfo, ICaterogy } from '../types';
import BookItem from '../BookItem/BookItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { appendBooks, appendCategories, setAll, setCategory } from '../booksSlice';

function MainPage() {
    const dispatch = useDispatch();
    const books = useSelector((state: RootState) => state.books);
    const categories = useSelector((state: RootState) => state.categories);
    const category = useSelector((state: RootState) => state.category);
    const [page, setPage] = useState(2);
    const [pageCategory, setPageCategory] = useState(2);

    const addBookItems = (): JSX.Element[] => {
        return books.map((bookItem: IBookInfo) => {
            return (
                <BookItem
                    book={bookItem}
                    key={bookItem.id}
                />
            );
        });
    }

    const addCategoryItems = (): JSX.Element[] => {
        return categories.map((categoryItem: ICaterogy) => {
            return (
                <a
                    className='category'
                    key={categoryItem.id}
                    style={{backgroundColor: categoryItem.name === category 
                        ? "red" : "transparent"}}
                    onClick={() => {
                        setPage(2);
                        dispatch(setCategory(categoryItem.name));
                    }}
                >
                    {categoryItem.name}
                </a>
            );
        });
    }

    const loadFirstPageBooks = async () => {
        axios.get(API_PATH + '/api/v1/books', {
            params: {
              perPage: 1,
              page: 1,
              category: category
            },
        }).then((response: any) => {
            dispatch(setAll(response.data));
        }).catch((error) => {
            console.error(error);
        });
    }

    const loadMore = async () => {
        await axios.get(API_PATH + '/api/v1/books', {
            params: {
              perPage: 1,
              page: page,
              category: category
            },
        }).then((response: any) => {
            if (response.data.length) 
                dispatch(appendBooks(response.data));
        }).catch((error) => {
            console.error(error);
        });

        setPage(prev => prev + 1);
    }

    const loadMoreCategories = async () => {
        axios.get(API_PATH + '/api/v1/categories', {
            params: {
              perPage: 1,
              page: pageCategory
            },
        }).then((response: any) => {
            if (response.data.length) 
                dispatch(appendCategories(response.data));
        }).catch((error) => {
            console.error(error);
        });

        setPageCategory(prev => prev + 1);
    }

    useEffect(() => {
        loadFirstPageBooks();
    }, [category]);

    return (
        <div className='main-page'>
            <div className='categories-container'>
                <div className='categories'>
                    {addCategoryItems()}
                </div>
                <button className='books__load-more-button'
                    onClick={() => {
                        loadMoreCategories();
                    }}
                >
                    Load more
                </button>
            </div>
            <div className='books'>
                <div className='books-container'>
                    {addBookItems()}
                </div>
                <button className='books__load-more-button'
                    onClick={() => {
                        loadMore();
                    }}
                >
                    Load more
                </button>
            </div>
        </div>
    );
}

export default MainPage;

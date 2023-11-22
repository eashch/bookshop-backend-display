import { useState } from "react";
import { API_PATH, IBookInfoItemProps } from "../types";
import './BookItem.css';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reduxStore";

const currencySymbols = {
    'USD': '$', 
    'EUR': '€',
    'CRC': '₡',
    'GBP': '£',
    'ILS': '₪',
};


function BookItem(bookProps: IBookInfoItemProps) {
    const [selectedRating, setSelectedRating] = useState('5');
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.token);
    const user = useSelector((state: RootState) => state.user);

    const getCurrencySymbol = () => {
        if(currencySymbols[bookProps.book.currency] === undefined) {
            return `(${bookProps.book.currency})`;
        }
        return currencySymbols[bookProps.book.currency];
    }

    const rateBook = async () => {
        if (!user || !token)
            return;
        axios.post(API_PATH + `/api/v1/rating`, {
            rating: parseInt(selectedRating),
            bookId: bookProps.book.id,
            userId: user.id
        }, {
            headers: {Authorization: `Bearer ${token}`}
        }).then((response: any) => {
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className='book'>
            <p className='book__title'>
                {bookProps.book.name}
            </p>
            
            <p className="book__description-text">
                {bookProps.book.authors.join(', ')}
            </p>
            <p className="book__description-text">
                {bookProps.book.categories.join(', ')}
            </p>
            <p className="book__description-text">
                {bookProps.book.language}
            </p>
            <p className="book__description-text">
                {bookProps.book.year.toFixed()}
            </p>
            <p className="book__rating">
               Rating: {bookProps.book.rating.toFixed(2)}
            </p>
            <p className='book__price'>
                {bookProps.book.price.toFixed(2)} {getCurrencySymbol()}
            </p>
            <select
                style={{width: 100, display: user ? 'initial' : 'none'}}
                value={selectedRating} 
                onChange={e => setSelectedRating(e.target.value)}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button
                style={{width: 100, display: user ? 'initial' : 'none'}}
                onClick={() => {
                    rateBook();
                }}
            >
                rate
            </button>
        </div>
    );
}

export default BookItem;
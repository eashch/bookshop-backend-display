export const API_PATH = 'https://backend-bookshop-eashchs-projects.vercel.app';

export interface IBookInfo {
    id: number;
    name: string;
    authors: string[];
    language: string;
    categories: string[];
    price: number;
    currency: string;
    year: number;
    rating: number;
}

export interface ICaterogy {
    id: number,
    name: string
}

export interface IUser {
    id: number,
    login_or_email: string,
    name: string,
    register_date: string,
    description: string
}

export interface IBookInfoItemProps {
    book: IBookInfo;
};

export interface IBookInfoSlice {
    books: IBookInfo[]
    loadingStatus: ELoadingStatus,
    categories: ICaterogy[],
    token: string,
    user: IUser,
    category: string
}

export enum ELoadingStatus {
    LOADING,
    LOADED,
    ERROR
};
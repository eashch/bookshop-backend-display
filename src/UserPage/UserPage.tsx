import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reduxStore';
import './UserPage.css';
import { useState } from 'react';
import axios from 'axios';
import { setToken, setUser } from '../booksSlice';
import { API_PATH } from '../types';

function UsersPage() {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.token);
    const user = useSelector((state: RootState) => state.user);

    const [inputLoginLogin, setLoginLogin] = useState('');
    const [inputLoginPassword, setLoginPassword] = useState('');
    const [inputRegisterLogin, setRegisterLogin] = useState('');
    const [inputRegisterEmail, setRegisterEmail] = useState('');
    const [inputRegisterPassword, setRegisterPassword] = useState('');
    const [hasRegisterFieldsError, setHasRegisterFieldsError] = useState(false);
    const [hasLoginFieldsError, setHasLoginFieldsError] = useState(false);

    const [newUserName, setNewUserName] = useState('');
    const [newUserDescription, setNewUserDescription] = useState('');
    const [userEditVisible, setUserEditVisible] = useState(false);

    const register = async () => {
        axios.post(API_PATH + '/api/v1/user/register', {
            login: inputRegisterLogin ?? null,
            email: inputRegisterEmail ?? null,
            password: inputRegisterPassword
        }).then((response: any) => {
            if (response.headers.token) {
                dispatch(setToken(response.headers.token));
            }
            if (response.data) {
                dispatch(setUser(response.data)); 
            }
        }).catch((error) => {
            console.error(error);
            setHasRegisterFieldsError(true);
        });
    }

    const logIn = async () => {
        axios.post(API_PATH + '/api/v1/user/login', {
            loginOrEmail: inputLoginLogin,
            password: inputLoginPassword
        }).then((response: any) => {
            if (response.headers.token) {
                dispatch(setToken(response.headers.token));
            }
            if (response.data) {
                dispatch(setUser(response.data)); 
            }
        }).catch((error) => {
            console.error(error);
            setHasLoginFieldsError(true);
        });
    }

    const editUser = async () => {
        if (!user || !token)
            return;
        axios.put(API_PATH + `/api/v1/user/${user.id}`, {
            name: newUserName,
            description: newUserDescription
        }, {
            headers: {Authorization: `Bearer ${token}`}
        }).then((response: any) => {
            if (response.data) {
                dispatch(setUser(response.data)); 
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const deleteUser = async () => {
        if (!user || !token)
            return;
        axios.delete(API_PATH + `/api/v1/user/${user.id}`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then((response: any) => {
            dispatch(setUser(null)); 
            dispatch(setToken('')); 
        }).catch((error) => {
            console.error(error);
        });
    }


    const validateEmail = (email: string): boolean => {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return expression.test(String(email));
    };

    const getWindow = (): JSX.Element => {
        if (token) {
            return (
                user ?
                <div className='user-info'>
                    <h3>{user.login_or_email}</h3>
                    <span>name: {user.name}</span>
                    <span>register date: {(new Date(user.register_date)).toDateString()}</span>
                    <p>description: {user.description}</p>
                    <button className='login-button'
                        onClick={() => {
                            setUserEditVisible(prev => !prev);
                        }}
                    >
                        {userEditVisible ? 'Close change window' : 'Open change window'}
                    </button>
                    <div className='user-change-tab'
                        style={{display: userEditVisible ? 'flex' : 'none'}}
                    >
                        <div className='login-field'>
                            <span>new name:</span>
                            <input type="text" 
                                value={newUserName} 
                                onInput={e => {
                                    setNewUserName((e.target as HTMLInputElement).value.trim())
                                }}
                            />
                        </div>
                        <div className='login-field'>
                            <span>new description:</span>
                            <input type="text" 
                                value={newUserDescription} 
                                onInput={e => {
                                    setNewUserDescription((e.target as HTMLInputElement).value.trim())
                                }}
                            />
                        </div>
                        <button className='login-button'
                            disabled = {!newUserName.length && !newUserDescription.length}
                            onClick={() => {
                                editUser();
                            }}
                        >
                            Change
                        </button>
                    </div>
                    <div className='user-books'>

                    </div>
                    <button className='login-button'
                        onClick={() => {
                            deleteUser();
                        }}
                    >
                        Delete user
                    </button>
                </div>
                :
                <div>
                    <h3>Log in or register</h3>
                </div>
            );
        } else {
            return (
                <div className='login-or-register'>
                    <div className='login-tab'>
                        <h3>Log in</h3>
                        <div className='login-field'>
                            <span style={{color: hasLoginFieldsError ? 'red' : 'black'}}>login or email</span>
                            <input type="text" 
                                value={inputLoginLogin} 
                                onInput={e => {
                                    setLoginLogin((e.target as HTMLInputElement).value.trim())
                                }}
                            />
                        </div>
                        <div className='login-field'>
                            <span style={{color: hasLoginFieldsError ? 'red' : 'black'}}>password</span>
                            <input type='password' 
                                value={inputLoginPassword} 
                                onInput={e => {
                                    setLoginPassword((e.target as HTMLInputElement).value.trim())
                                }}
                            />
                        </div>
                        <button className='login-button'
                            disabled = {!inputLoginLogin.length 
                                || !inputLoginPassword.length}
                            onClick={() => {
                                logIn();   
                            }}
                        >
                            Log in
                        </button>
                    </div>
                    <h2 className='login-option-text'>OR</h2>
                    <div className='login-tab'>
                        <h3>Register</h3>
                        <div className='login-field'>
                            <span>by login</span>
                            <input type="text" 
                                value={inputRegisterLogin} 
                                disabled = {inputRegisterEmail.length > 0}
                                onInput={e => {
                                    setRegisterLogin((e.target as HTMLInputElement).value.trim())
                                }}
                            />
                        </div>
                        <span className='login-text-or'>or</span>
                        <div className='login-field'>
                            <span style={{color: hasRegisterFieldsError ? 'red' : 'black'}}>by email</span>
                            <input type="text" 
                                value={inputRegisterEmail} 
                                disabled = {inputRegisterLogin.length > 0}
                                onInput={e => {
                                    setRegisterEmail((e.target as HTMLInputElement).value.trim())
                                }}
                            />
                        </div>
                        <div className='login-field'>
                            <span style={{color: hasRegisterFieldsError ? 'red' : 'black'}} >password (min: 6)</span>
                            <input type='password' 
                                value={inputRegisterPassword} 
                                onInput={e => {
                                    setRegisterPassword((e.target as HTMLInputElement).value.trim())
                                }}
                            />
                        </div>
                        <button className='login-button'
                            disabled = {(!inputRegisterLogin.length && !inputRegisterEmail.length) 
                                || !inputRegisterPassword.length}
                            onClick={() => {
                                if (inputRegisterPassword.length < 6 
                                        || (inputRegisterEmail.length 
                                                && !validateEmail(inputRegisterEmail))) {
                                    setHasRegisterFieldsError(true);
                                    return;
                                }
                                setHasRegisterFieldsError(false);
                                register();   
                            }}
                        >
                            Register
                        </button>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className='user-page'>
            <h2>User page</h2>
            {getWindow()}
        </div>
    );
}

export default UsersPage;
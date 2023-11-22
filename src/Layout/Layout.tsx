import { Outlet, useNavigate, useLocation } from "react-router-dom";
import './Layout.css';
import iconUser from '../user.png';
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore";

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="layout">
            <header className="layout-header">
                <h1 
                className={location.pathname !== "/" 
                    ? "layout__button-home_active" 
                    : "layout__button-home"} 
                onClick={() => {
                    if (location.pathname !== "/")
                        navigate('/');
                }}>
                    Bookshop
                </h1>
                <div className="header-user">
                    <h3>{user ? user.login_or_email : 'Please log in or register'}</h3>
                    <button className="user-button"
                        onClick={() => {
                            navigate('user');
                        }}
                    >
                        <img src={iconUser} className="user-icon"/>
                    </button>
                </div>
            </header>
            <Outlet />
        </div>
    )
};

export default Layout;

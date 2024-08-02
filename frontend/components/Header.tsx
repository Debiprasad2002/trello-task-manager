import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { logout } from '../store/authSlice';
import Link from 'next/link'; // Import Link from next/link

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <h1>Trello-Style Task Manager</h1>
      {userInfo ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div>
          <Link href="/login">
            <a>Login</a>
          </Link> 
          {' | '}
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

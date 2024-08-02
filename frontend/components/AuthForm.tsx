import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, signup } from '../store/authSlice';
import { RootState, AppDispatch } from '../store';

interface AuthFormProps {
  isSignup: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const action = isSignup ? signup({ email, password }) : login({ email, password });
    dispatch(action);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isSignup ? 'Signup' : 'Login'}</h2>
      {error && <p>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : isSignup ? 'Signup' : 'Login'}
      </button>
    </form>
  );
};

export default AuthForm;

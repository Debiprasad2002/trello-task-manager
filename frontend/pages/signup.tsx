import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
        email,
        password,
      });
      router.push('/dashboard');
    } catch (error: any) {  // Cast error to 'any'
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-300 to-white">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome to <span className="text-purple-500">Workflo</span>!</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-purple-500">Log in.</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

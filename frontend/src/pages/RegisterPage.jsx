import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/40">
        <div className="mb-7 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-green-400">Team Productivity Suite</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">Sign up to start tracking attendance, tasks, and productivity.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
          {error && <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</p>}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-300">
              Name
              <input
                type="text"
                {...register('name', { required: true })}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-green-400"
              />
            </label>
            <label className="block text-sm font-medium text-slate-300">
              Email
              <input
                type="email"
                {...register('email', { required: true })}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-green-400"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-300">
              Password
              <input
                type="password"
                {...register('password', { required: true })}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-green-400"
              />
            </label>
            <label className="block text-sm font-medium text-slate-300">
              Department
              <input
                type="text"
                {...register('department')}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-green-400"
              />
            </label>
          </div>
          <button type="submit" className="rounded-2xl bg-green-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-green-400">
            Create account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?
          <button onClick={() => navigate('/login')} className="ml-2 font-semibold text-green-400 hover:text-green-300">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

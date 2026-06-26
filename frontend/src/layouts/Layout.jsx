import { Outlet, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(true);

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/attendance', label: 'Attendance' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/reports', label: 'Reports' },
    { path: '/profile', label: 'Profile' },
    ...(user?.role === 'ADMIN' ? [{ path: '/admin', label: 'Admin' }] : []),
  ];

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-lg sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-base font-semibold text-green-400">Team Productivity Suite</p>
            <p className="text-xs text-slate-400">Integrated attendance, tasks, reports & productivity</p>
          </div>
          <div className="flex items-center gap-3">
            {/* <button
              onClick={toggleDarkMode}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
            >
              {darkMode ? 'Light' : 'Dark'}
            </button> */}
            <button
              onClick={logout}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Navigation</p>
            {user && <p className="mt-3 text-sm text-slate-300">Signed in as {user.name}</p>}
          </div>
          <nav className="space-y-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? 'bg-green-500/15 text-green-300' : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;

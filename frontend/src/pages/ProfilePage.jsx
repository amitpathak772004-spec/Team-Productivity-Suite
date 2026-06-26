import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Profile</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">My account</h2>
          </div>
          <button className="rounded-2xl bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-700">Edit profile</button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            { label: 'Name', value: user?.name || 'N/A' },
            { label: 'Role', value: user?.role || 'N/A' },
            { label: 'Email', value: user?.email || 'N/A' },
            { label: 'Department', value: user?.department || 'N/A' },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

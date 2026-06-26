const AdminPanelPage = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Admin panel</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Team operations dashboard</h2>
          </div>
          <button className="rounded-2xl bg-green-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-green-400">Manage team</button>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Employees</p>
          <p className="mt-4 text-4xl font-semibold text-white">128</p>
          <p className="mt-2 text-sm text-slate-500">Total active employees</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Present</p>
          <p className="mt-4 text-4xl font-semibold text-white">96</p>
          <p className="mt-2 text-sm text-slate-500">Checked in today</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Productivity</p>
          <p className="mt-4 text-4xl font-semibold text-white">84%</p>
          <p className="mt-2 text-sm text-slate-500">Overall score</p>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Team metrics</p>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-3xl bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Pending tasks</p>
            <p className="mt-3 text-3xl font-semibold text-white">42</p>
          </div>
          <div className="rounded-3xl bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Open reports</p>
            <p className="mt-3 text-3xl font-semibold text-white">18</p>
          </div>
          <div className="rounded-3xl bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Notifications</p>
            <p className="mt-3 text-3xl font-semibold text-white">7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;

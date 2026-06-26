import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import useDashboardData from '../hooks/useDashboardData';
import LoadingSpinner from '../components/LoadingSpinner';

const colors = ['#22c55e', '#38bdf8', '#c084fc'];

const DashboardPage = () => {
  const { data, isLoading, isError } = useDashboardData();

  const summary = data || {};

  const trendData = [
    { name: 'Mon', productivity: 68 },
    { name: 'Tue', productivity: 74 },
    { name: 'Wed', productivity: 81 },
    { name: 'Thu', productivity: 77 },
    { name: 'Fri', productivity: 88 },
    { name: 'Sat', productivity: 72 },
    { name: 'Sun', productivity: 84 },
  ];

  // Handle different data structures for different roles
  const taskAnalytics = summary.taskAnalytics || { totalTasks: 0, completedTasks: 0, pendingTasks: 0 };
  const completedTasks = summary.completedTasks || taskAnalytics.completedTasks || 0;
  const pendingTasks = summary.pendingTasks || taskAnalytics.pendingTasks || 0;
  const totalTasks = summary.totalTasks || taskAnalytics.totalTasks || 0;

  const taskCompletion = [
    { name: 'Completed', value: completedTasks },
    { name: 'Pending', value: pendingTasks },
    { name: 'Other', value: Math.max(0, totalTasks - completedTasks - pendingTasks) },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Total employees</p>
          <p className="mt-4 text-3xl font-semibold text-white">{summary.totalEmployees || summary.teamMembers || 0}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Present today</p>
          <p className="mt-4 text-3xl font-semibold text-white">{summary.presentEmployees || summary.activeTasks || 0}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Absent / Completed</p>
          <p className="mt-4 text-3xl font-semibold text-white">{summary.absentEmployees || completedTasks || 0}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Productivity</p>
          <p className="mt-4 text-3xl font-semibold text-white">{summary.productivityOverview || summary.productivityScore || 0}%</p>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Team productivity</p>
              <h2 className="mt-2 text-xl font-semibold text-white">Weekly performance</h2>
            </div>
          </div>
          <div className="mt-8 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px' }} />
                <Area type="monotone" dataKey="productivity" stroke="#22c55e" fillOpacity={1} fill="url(#productivityGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid gap-5">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Task completion</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Current status</h2>
              </div>
            </div>
            <div className="mt-8 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={taskCompletion} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                    {taskCompletion.map((entry, index) => (
                      <Cell key={entry.name} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Summary</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Total tasks</p>
                <p className="mt-2 text-3xl font-semibold text-white">{totalTasks || summary.assignedTasks || 0}</p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Completed</p>
                <p className="mt-2 text-3xl font-semibold text-white">{completedTasks}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

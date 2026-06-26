import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAttendanceData from '../hooks/useAttendanceData';
import { checkIn, checkOut, breakIn, breakOut } from '../services/attendanceService';
import LoadingSpinner from '../components/LoadingSpinner';

const AttendancePage = () => {
  const [activeMonth] = useState(new Date().getMonth() + 1);
  const [activeYear] = useState(new Date().getFullYear());
  const queryClient = useQueryClient();
  const { data, isLoading } = useAttendanceData(activeMonth, activeYear);
  const [actionMessage, setActionMessage] = useState('');

  const updateAttendance = async (action) => {
    setActionMessage('Processing...');
    if (action === 'checkin') return checkIn();
    if (action === 'checkout') return checkOut();
    if (action === 'breakin') return breakIn();
    if (action === 'breakout') return breakOut();
    throw new Error('Unknown action');
  };

  const mutation = useMutation({
    mutationFn: updateAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance', activeMonth, activeYear] });
      setActionMessage('Action completed successfully.');
    },
    onError: (error) => {
      setActionMessage(error.response?.data?.message || 'Action failed.');
    },
  });

  const handleAction = (action) => {
    mutation.mutate(action);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Attendance control</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Daily check-in dashboard</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => handleAction('checkin')} className="rounded-2xl bg-green-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-green-400">Check In</button>
            <button onClick={() => handleAction('checkout')} className="rounded-2xl bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-700">Check Out</button>
          </div>
        </div>
        {actionMessage && <p className="mt-4 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-slate-300">{actionMessage}</p>}
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
          <p className="text-sm text-slate-400">Monthly attendance</p>
          <p className="mt-4 text-3xl font-semibold text-white">{data?.length || 0}</p>
          <p className="mt-2 text-sm text-slate-500">Records for {activeMonth}/{activeYear}</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
          <p className="text-sm text-slate-400">Checked in days</p>
          <p className="mt-4 text-3xl font-semibold text-white">{data?.filter((row) => row.checkIn).length || 0}</p>
          <p className="mt-2 text-sm text-slate-500">Current month progress</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
          <p className="text-sm text-slate-400">Break logs</p>
          <p className="mt-4 text-3xl font-semibold text-white">{data?.reduce((sum, row) => sum + (row.totalHours || 0), 0).toFixed(1) || 0}</p>
          <p className="mt-2 text-sm text-slate-500">Total hours logged</p>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Attendance timeline</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Recent activity</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4">
          {(data || []).slice(-3).reverse().map((record) => (
            <div key={record.date} className="rounded-3xl bg-slate-900/80 p-4">
              <p className="text-sm text-slate-400">{record.date}</p>
              <p className="mt-2 text-base font-semibold text-white">Check In: {record.checkIn ? new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;

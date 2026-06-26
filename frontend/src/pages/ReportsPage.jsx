import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useReportsData from '../hooks/useReportsData';
import { submitReport } from '../services/reportApi';
import LoadingSpinner from '../components/LoadingSpinner';

const ReportsPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useReportsData();
  const reports = data || [];
  const [selectedReport, setSelectedReport] = useState(null);
  const [formData, setFormData] = useState({
    report: '',
    completedTasks: [''],
    challenges: '',
    nextDayPlan: '',
    hoursWorked: 0,
  });
  const [message, setMessage] = useState('');

  const reportMutation = useMutation({
    mutationFn: submitReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      setMessage('Report submitted successfully.');
      setFormData({ report: '', completedTasks: [''], challenges: '', nextDayPlan: '', hoursWorked: 0 });
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || 'Unable to submit report.');
    },
  });

  useEffect(() => {
    if (!selectedReport && reports.length > 0) {
      setSelectedReport(reports[0]);
    }
  }, [reports, selectedReport]);

  const handleSubmitReport = (event) => {
    event.preventDefault();
    setMessage('');
    reportMutation.mutate({
      report: formData.report,
      completedTasks: formData.completedTasks.filter(Boolean),
      challenges: formData.challenges,
      nextDayPlan: formData.nextDayPlan,
      hoursWorked: Number(formData.hoursWorked),
    });
  };

  const updateCompletedTask = (index, value) => {
    setFormData((prev) => {
      const completedTasks = [...prev.completedTasks];
      completedTasks[index] = value;
      return { ...prev, completedTasks };
    });
  };

  const addCompletedTask = () => {
    setFormData((prev) => ({ ...prev, completedTasks: [...prev.completedTasks, ''] }));
  };

  const removeCompletedTask = (index) => {
    setFormData((prev) => ({
      ...prev,
      completedTasks: prev.completedTasks.filter((_, idx) => idx !== index),
    }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Daily report</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Submit progress updates</h2>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmitReport} className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
        <div className="grid gap-6">
          <div>
            <label className="block text-sm text-slate-300">Report summary</label>
            <textarea
              value={formData.report}
              onChange={(event) => setFormData((prev) => ({ ...prev, report: event.target.value }))}
              className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-4 text-sm text-white outline-none focus:border-green-500"
              rows={4}
              placeholder="Summarize today's progress"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300">Completed tasks</label>
            <div className="space-y-3">
              {formData.completedTasks.map((task, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    value={task}
                    onChange={(event) => updateCompletedTask(index, event.target.value)}
                    className="flex-1 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-green-500"
                    placeholder={`Completed task ${index + 1}`}
                  />
                  {formData.completedTasks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCompletedTask(index)}
                      className="rounded-2xl bg-slate-800 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addCompletedTask}
                className="rounded-2xl bg-slate-800 px-4 py-3 text-sm text-slate-200 hover:bg-slate-700"
              >
                Add task
              </button>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="block text-sm text-slate-300">Challenges</label>
              <textarea
                value={formData.challenges}
                onChange={(event) => setFormData((prev) => ({ ...prev, challenges: event.target.value }))}
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-4 text-sm text-white outline-none focus:border-green-500"
                rows={3}
                placeholder="Any blockers or challenges faced"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300">Next day plan</label>
              <textarea
                value={formData.nextDayPlan}
                onChange={(event) => setFormData((prev) => ({ ...prev, nextDayPlan: event.target.value }))}
                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-4 text-sm text-white outline-none focus:border-green-500"
                rows={3}
                placeholder="Plan for tomorrow"
              />
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="block text-sm text-slate-300">Hours worked</label>
              <input
                type="number"
                min="0"
                value={formData.hoursWorked}
                onChange={(event) => setFormData((prev) => ({ ...prev, hoursWorked: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-green-500"
              />
            </div>
            <div className="flex items-end justify-end">
              <button
                type="submit"
                disabled={reportMutation.isLoading}
                className="rounded-2xl bg-green-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {reportMutation.isLoading ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </div>
          {message && <p className="text-sm text-slate-200">{message}</p>}
        </div>
      </form>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Recent reports</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Latest updates</h2>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {reports.slice(0, 4).map((report) => (
                <button
                  key={report._id}
                  type="button"
                  onClick={() => setSelectedReport(report)}
                  className={`w-full rounded-3xl border p-4 text-left transition ${
                    selectedReport?._id === report._id ? 'border-green-500 bg-slate-900' : 'border-slate-800 bg-slate-950 hover:border-green-500 hover:bg-slate-900'
                  }`}
                >
                  <p className="text-sm text-slate-400">{new Date(report.createdAt).toLocaleDateString()}</p>
                  <p className="mt-2 font-semibold text-white">{report.report.substring(0, 70)}...</p>
                  <p className="mt-2 text-sm text-slate-400">Hours: {report.hoursWorked}</p>
                </button>
              ))}
              {reports.length === 0 && <p className="text-sm text-slate-500">No reports have been submitted yet.</p>}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
            <p className="text-sm text-slate-400">Summary</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li>Reports submitted: {reports.length}</li>
              <li>Avg hours: {reports.length ? (reports.reduce((sum, item) => sum + (item.hoursWorked || 0), 0) / reports.length).toFixed(1) : 0}</li>
              <li>Recent challenge: {reports[0]?.challenges || 'No data'}</li>
              <li>Next steps: {reports[0]?.nextDayPlan || 'No data'}</li>
            </ul>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Selected report</p>
          {selectedReport ? (
            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-slate-400">Submitted</p>
                <p className="mt-2 text-lg font-semibold text-white">{new Date(selectedReport.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Author</p>
                <p className="mt-2 text-lg font-semibold text-white">{selectedReport?.userId?.name || 'You'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Progress summary</p>
                <p className="mt-2 text-white">{selectedReport.report}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Completed tasks</p>
                <ul className="mt-2 space-y-2 text-slate-200">
                  {selectedReport.completedTasks?.length ? (
                    selectedReport.completedTasks.map((task, index) => (
                      <li key={index} className="rounded-2xl bg-slate-900 px-4 py-3">
                        {task}
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-500">No completed tasks listed.</li>
                  )}
                </ul>
              </div>
              <div>
                <p className="text-sm text-slate-400">Challenges</p>
                <p className="mt-2 text-white">{selectedReport.challenges || 'No challenges reported.'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Next day plan</p>
                <p className="mt-2 text-white">{selectedReport.nextDayPlan || 'No plan provided.'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Hours worked</p>
                <p className="mt-2 text-white">{selectedReport.hoursWorked || 0}</p>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Select a report to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;

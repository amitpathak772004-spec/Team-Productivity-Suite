import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useTasksData from '../hooks/useTasksData';
import { createTask, updateTask } from '../services/taskApi';
import LoadingSpinner from '../components/LoadingSpinner';

const statusOrder = ['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'];

const TasksPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useTasksData(1, 12);
  const tasks = data?.tasks || [];
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    deadline: '',
  });
  const [message, setMessage] = useState('');

  const taskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setMessage('Task created successfully.');
      setFormData({ title: '', description: '', priority: 'MEDIUM', deadline: '' });
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || 'Unable to create task.');
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, payload }) => updateTask(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setMessage('Task updated successfully.');
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || 'Unable to update task.');
    },
  });

  const handleCreateTask = (event) => {
    event.preventDefault();
    setMessage('');
    taskMutation.mutate({
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      deadline: formData.deadline,
    });
  };

  const handleAdvanceStatus = (task) => {
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[Math.min(currentIndex + 1, statusOrder.length - 1)];
    updateTaskMutation.mutate({ id: task._id, payload: { status: nextStatus } });
  };

  const handleRevertStatus = (task) => {
    const currentIndex = statusOrder.indexOf(task.status);
    const prevStatus = statusOrder[Math.max(currentIndex - 1, 0)];
    updateTaskMutation.mutate({ id: task._id, payload: { status: prevStatus } });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Task centre</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Your task board</h2>
          </div>
        </div>
        <form onSubmit={handleCreateTask} className="mt-6 grid gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm text-slate-300">Title</label>
              <input
                value={formData.title}
                onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-green-500"
                placeholder="Enter task title"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300">Priority</label>
              <select
                value={formData.priority}
                onChange={(event) => setFormData((prev) => ({ ...prev, priority: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-green-500"
              >
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-slate-300">Description</label>
              <textarea
                value={formData.description}
                onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-green-500"
                rows={4}
                placeholder="Describe the task"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300">Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(event) => setFormData((prev) => ({ ...prev, deadline: event.target.value }))}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-green-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-300">Create a new task to keep your team on track.</p>
            <button
              type="submit"
              disabled={taskMutation.isLoading}
              className="inline-flex items-center justify-center rounded-2xl bg-green-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {taskMutation.isLoading ? 'Creating...' : 'Create Task'}
            </button>
          </div>
          {message && <p className="text-sm text-slate-200">{message}</p>}
        </form>
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        {['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'].map((status) => (
          <div key={status} className="rounded-3xl border border-slate-800 bg-slate-950 p-5 shadow-xl shadow-slate-950/20">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{status.replace('_', ' ')}</h3>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">{tasks.filter((task) => task.status === status).length}</span>
            </div>
            <div className="space-y-4">
              {tasks.filter((task) => task.status === status).slice(0, 3).map((task) => (
                <div key={task._id} className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">{task.priority} priority</p>
                  <p className="mt-2 font-semibold text-white">{task.title}</p>
                  <p className="mt-1 text-sm text-slate-500">Deadline: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleRevertStatus(task)}
                      disabled={task.status === 'TODO' || updateTaskMutation.isLoading}
                      className="rounded-full bg-slate-800 px-3 py-2 text-xs text-slate-200 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdvanceStatus(task)}
                      disabled={task.status === 'COMPLETED' || updateTaskMutation.isLoading}
                      className="rounded-full bg-green-500 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Advance
                    </button>
                  </div>
                </div>
              ))}
              {tasks.filter((task) => task.status === status).length === 0 && (
                <p className="text-sm text-slate-500">No tasks in this lane yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;

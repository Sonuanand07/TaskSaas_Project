import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import TaskItem from '../components/TaskItem.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { apiCall } from '../services/api.js';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await apiCall('/tasks');
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      await apiCall(`/tasks/${id}`, { method: 'PUT' });
      fetchTasks();
      toast.success('Task updated');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete task?')) return;
    try {
      await apiCall(`/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    try {
      await apiCall('/tasks', {
        method: 'POST',
        body: JSON.stringify(newTask),
      });
      setNewTask({ title: '', description: '' });
      fetchTasks();
      toast.success('Task created');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Tasks</h1>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task title"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Description (optional)"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows="3"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Add Task
            </button>
          </div>
        </form>
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


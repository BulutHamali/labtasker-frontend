import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useApi from "../hooks/useApi";

const cardClasses =
  "bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 hover:shadow-lg transition";
const buttonClasses =
  "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition";

interface Task {
  _id: string;
  name: string;
  dueDate: string;
  completed: boolean;
}

export default function ProjectDetailsPage() {
  // FIX: useParams must match ":projectId" from App.tsx route
  const { projectId } = useParams<{ projectId: string }>();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const api = useApi();

  const fetchTasks = async () => {
    if (!projectId) {
      setError("Invalid project ID");
      setLoading(false);
      return;
    }
    try {
      const res = await api.get(`/projects/${projectId}/tasks`);
      setTasks(res.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;

    try {
      const res = await api.post(`/projects/${projectId}/tasks`, {
        name: newTask,
        dueDate: dueDate || undefined,
      });
      setTasks([...tasks, res.data]);
      setNewTask("");
      setDueDate("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Project Details</h1>

        <Link to="/dashboard" className="text-blue-500 hover:underline mb-6 block">
          ← Back to Dashboard
        </Link>

        {/* Add New Task */}
        <form
          onSubmit={addTask}
          className="mb-8 p-4 bg-white rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-xl font-semibold">Add New Task</h2>
          <input
            type="text"
            placeholder="Task Name"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-400"
          />
          <button type="submit" className={buttonClasses}>
            Add Task
          </button>
        </form>

        {/* Error / Loading / Tasks */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task._id} className={cardClasses}>
                <h3 className="text-lg font-semibold">{task.name}</h3>
                {task.dueDate && (
                  <p className="text-gray-500 text-sm">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
                <p className={`text-sm ${task.completed ? "text-green-600" : "text-gray-700"}`}>
                  {task.completed ? "Completed" : "Pending"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

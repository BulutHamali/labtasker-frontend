import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import useApi from '../hooks/useApi';

interface Task {
  _id: string;
  name: string;
  dueDate?: string;
  status: 'To Do' | 'In Progress' | 'Done';
  completed: boolean;
  order?: number;
}

interface Project {
  _id: string;
  name: string;
  description?: string;
}

export default function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [editingProject, setEditingProject] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState('');
  const [editedProjectDesc, setEditedProjectDesc] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedDueDate, setEditedDueDate] = useState('');
  const api = useApi();
  const statuses: Task['status'][] = ['To Do', 'In Progress', 'Done'];

  const fetchProjectAndTasks = async () => {
    try {
      console.log('Fetching project from:', `/projects/${projectId}`);
      console.log('Fetching tasks from:', `/tasks/${projectId}/tasks`);
      const projRes = await api.get(`/projects/${projectId}`);
      const taskRes = await api.get(`/tasks/${projectId}/tasks`);
      setProject(projRes.data);
      setTasks(taskRes.data);
      setError(null);
    } catch (err: any) {
      console.error('Fetch Error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to load project or tasks');
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async () => {
    try {
      const res = await api.put(`/projects/${projectId}`, {
        name: editedProjectName,
        description: editedProjectDesc,
      });
      setProject(res.data);
      setEditingProject(false);
    } catch {
      setError('Failed to update project');
    }
  };

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(`/projects/${projectId}/tasks`, {
        name: newTask,
        dueDate: dueDate || undefined,
      });
      setTasks([...tasks, res.data]);
      setNewTask('');
      setDueDate('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create task');
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      console.log('Updating task:', `/tasks/${projectId}/tasks/${taskId}`, updates);
      const response = await api.put(`/tasks/${projectId}/tasks/${taskId}`, updates);
      await fetchProjectAndTasks();
      return response.data;
    } catch (err: any) {
      console.error('Update Task Error:', err.response?.data || err.message);
      throw err;
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      console.log('Deleting task at:', `http://localhost:3001/api/tasks/${projectId}/tasks/${taskId}`);
      await api.delete(`tasks/${projectId}/tasks/${taskId}`); // Fixed path
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err: any) {
      console.error('Delete Task Error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to delete task');
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId as Task['status'];
    console.log(destination, draggableId, newStatus);
    console.log('Current tasks state:', tasks);

    const updatedTasks = tasks.map((task) =>
      task._id === draggableId ? { ...task, status: newStatus } : task
    );
    console.log('Updated tasks after drag:', updatedTasks);
    const tasksByStatus = statuses.reduce((acc, status) => {
      acc[status] = updatedTasks
        .filter((t) => t.status === status)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      return acc;
    }, {} as Record<Task['status'], Task[]>);

    const reorderedUpdates = Object.entries(tasksByStatus).flatMap(([status, arr]) =>
      arr.map((task, index) => ({
        taskId: task._id,
        status: status as Task['status'],
        order: index,
      }))
    );

    console.log('Reordered updates:', reorderedUpdates);
    setTasks(updatedTasks);

    try {
      console.log('Sending PUT to:', `/tasks/${projectId}/tasks/reorder`, {
        updates: reorderedUpdates,
      });
      const response = await api.put(`/tasks/${projectId}/tasks/reorder`, {
        updates: reorderedUpdates,
      });
      console.log('Reorder response:', response.data);
    } catch (err: any) {
      console.error('Reorder Error:', err.response?.data || err.message);
      setError('Failed to save task positions');
      fetchProjectAndTasks();
    }
  };

  const startEditingTask = (task: Task) => {
    setEditingTaskId(task._id);
    setEditedName(task.name);
    setEditedDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
  };

  const saveTaskEdit = async (taskId: string) => {
    await updateTask(taskId, {
      name: editedName,
      dueDate: editedDueDate || undefined,
    });
    setEditingTaskId(null);
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  useEffect(() => {
    fetchProjectAndTasks();
  }, [projectId]);

  if (loading) return <p className="p-6">Loading project...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Editable Project Header */}
        {editingProject ? (
          <div className="space-y-3 p-4 bg-white rounded shadow">
            <input
              type="text"
              value={editedProjectName}
              onChange={(e) => setEditedProjectName(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <textarea
              value={editedProjectDesc}
              onChange={(e) => setEditedProjectDesc(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <div className="flex gap-3">
              <button
                onClick={saveProject}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingProject(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-white rounded shadow space-y-2">
            <h1 className="text-3xl font-bold">{project?.name}</h1>
            <p className="text-gray-600">{project?.description}</p>
            <button
              onClick={() => {
                setEditingProject(true);
                setEditedProjectName(project?.name || '');
                setEditedProjectDesc(project?.description || '');
              }}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Edit Project
            </button>
          </div>
        )}

        {/* Progress Bar */}
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-sm text-gray-600">{progress}% completed</p>
        </div>

        <Link to="/dashboard" className="text-blue-500 hover:underline block">
          ← Back to Dashboard
        </Link>

        {/* Add Task Form */}
        <form
          onSubmit={addTask}
          className="p-4 bg-white rounded-lg shadow space-y-4"
        >
          <h2 className="text-xl font-semibold">Add New Task</h2>
          <input
            type="text"
            placeholder="Task Name"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Task
          </button>
        </form>

        {/* Drag-and-Drop Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statuses.map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-white p-4 rounded-lg shadow min-h-[250px]"
                  >
                    <h3 className="text-lg font-bold mb-3">{status}</h3>
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="mb-3 p-3 bg-gray-100 rounded shadow space-y-2"
                            >
                              {editingTaskId === task._id ? (
                                <>
                                  <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="w-full px-2 py-1 border rounded"
                                  />
                                  <input
                                    type="date"
                                    value={editedDueDate}
                                    onChange={(e) => setEditedDueDate(e.target.value)}
                                    className="w-full px-2 py-1 border rounded"
                                  />
                                  <button
                                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                                    onClick={() => saveTaskEdit(task._id)}
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                                    onClick={() => setEditingTaskId(null)}
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <h4 className="font-semibold">{task.name}</h4>
                                  {task.dueDate && (
                                    <p className="text-gray-500 text-sm">
                                      Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </p>
                                  )}
                                  <div className="flex gap-2 mt-2 flex-wrap">
                                    <button
                                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                      onClick={() => startEditingTask(task)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                      onClick={() =>
                                        updateTask(task._id, {
                                          completed: !task.completed,
                                        })
                                      }
                                    >
                                      {task.completed ? 'Undo Complete' : 'Mark Complete'}
                                    </button>
                                    <button
                                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                      onClick={() => deleteTask(task._id)} // Line ~375
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
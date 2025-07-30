import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useApi from '../hooks/useApi.ts'


// Simple ShadCN card + button styles
const cardClasses =
  "bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 hover:shadow-lg transition"
const buttonClasses =
  "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"

interface Project {
  _id: string
  name: string
  description?: string
  createdAt: string
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const api = useApi()

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects')
      setProjects(res.data)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch projects')
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await api.post('/projects', {
        name: newName,
        description: newDesc,
      })
      setProjects([...projects, res.data])
      setNewName('')
      setNewDesc('')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create project')
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Projects</h1>

        {/* New Project Form */}
        <form
          onSubmit={createProject}
          className="mb-8 p-4 bg-white rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-xl font-semibold">Create New Project</h2>
          <input
            type="text"
            placeholder="Project Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            placeholder="Project Description (optional)"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <button type="submit" className={buttonClasses}>
            Add Project
          </button>
        </form>

        {/* Error & Loading */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project._id} className={cardClasses}>
                <h3 className="text-xl font-semibold">{project.name}</h3>
                {project.description && (
                  <p className="text-gray-600">{project.description}</p>
                )}
                <Link
                  to={`/projects/${project._id}`}
                  className="mt-auto text-blue-500 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

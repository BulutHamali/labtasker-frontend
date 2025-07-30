import { useParams } from "react-router-dom";

export default function ProjectDetailsPage() {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Project Details</h1>
      <p>Currently viewing Project ID: {projectId}</p>
      {/* Later: fetch project tasks using useApi() here */}
    </div>
  );
}

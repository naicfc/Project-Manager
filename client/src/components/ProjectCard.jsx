export default function ProjectCard({ project }) {
  return (
    <div className="p-4 shadow-sm shadow-gray-400">
      <div className="flex justify-between items-center">
        <h5 className="font-medium text-gray-600 text-lg">{project.name}</h5>
        <a
          href={`/projects/${project.id}`}
          className="shadow-sm shadow-gray-400 py-1 px-2">
          View
        </a>
      </div>
      <p
        className={
          project.status === "Completed"
            ? "text-green-500 text-sm"
            : "text-yellow-600 text-sm"
        }>
        {project.status}
      </p>
    </div>
  );
}

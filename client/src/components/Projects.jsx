import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div className="p-8 grid grid-cols-3 gap-2 text-gray-700">
        <div className="col-span-2">
          {data.projects.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 px-16 py-8">
              {data.projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p>No Data</p>
          )}
        </div>
        <ProjectForm />
      </div>
    </>
  );
}

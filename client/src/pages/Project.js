import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import DeleteProjectButton from "../components/DeleteProjectButton";
import UpdateProject from "../components/UpdateProject";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>{error.name}</p>;
  return (
    <div className="p-8 grid grid-cols-3 gap-2 text-gray-700">
      <div className="col-span-2">
        {!loading && !error && (
          <div className="mx-auto p-5 shadow-sm shadow-gray-500 flex justify-between">
            <div>
              <h3 className="text-sm font-semibold mb-2">PROJECT</h3>
              <p className="text-4xl mb-1">{data.project.name}</p>
              <p
                className={
                  data.project.status === "Completed"
                    ? "text-green-500 text-xl mb-1"
                    : "text-orange-500 text-xl  mb-1"
                }>
                {data.project.status}
              </p>
              <p className="mb-8">{data.project.description}</p>
              <div className="mb-8">
                <h3 className="text-sm font-semibold mb-2">CLIENT</h3>
                <p className="text-lg">{data.project.client.name}</p>
                <p className="text-lg">{data.project.client.email}</p>
                <p className="text-lg">{data.project.client.phone}</p>
              </div>
              <Link to="/" className="right-1 bg-zinc-200 px-2 py-1 mb-2">
                Back
              </Link>
            </div>
            <div className="gap-2 p-4">
              <DeleteProjectButton projectId={id} />
            </div>
          </div>
        )}
      </div>
      <UpdateProject project={data.project} />
    </div>
  );
}

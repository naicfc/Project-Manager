import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../components/Spinner";

export default function Project() {
  const { id } = useParams();
const {loading,error,data} = useQuery(GET_PROJECT, {
    variables: {id}
});

if(loading) return <Spinner />
if(error) return <p>{error.name}</p>
  return <>
  {!loading && !error && (
    <div className="mx-auto w-3/12 p-3 shadow-sm shadow-gray-500 mt-5">
        <Link to='/' className="right-1 bg-zinc-200 px-2 py-1" >Back</Link>
    </div>
  )}
  </>;
}

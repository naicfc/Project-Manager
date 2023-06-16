import { useQuery } from "@apollo/client";
import ClientBox from "./ClientBox";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";
import ClientsForm from "./ClientsForm";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>error</p>;

  return (
    <div className="p-8 grid grid-cols-3 gap-2 text-gray-700">
      <div className="col-span-2">
        {!loading && !error && (
          <div className="px-8 grid grid-cols-1 gap-2">
            {data.clients.map((client) => (
              <ClientBox key={client.id} client={client} />
            ))}
          </div>
        )}
      </div>
      <ClientsForm />
    </div>
  );
}

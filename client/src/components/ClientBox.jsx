import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ClientBox({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({
    //     query: GET_CLIENTS,
    //   });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
  });

  return (
    <div className="p-4 shadow-sm shadow-gray-500 flex justify-between rounded-md">
      <div>
        <div>
          <span className="font-semibold text-sm">Name:</span> {client.name}
        </div>
        <div>
          <span className="font-semibold text-sm">Email:</span> {client.email}
        </div>
        <div>
          <span className="font-semibold text-sm">Phone:</span> {client.phone}
        </div>
      </div>
      <button onClick={deleteClient}>
        <FaTrash className="text-red-500" />
      </button>
    </div>
  );
}

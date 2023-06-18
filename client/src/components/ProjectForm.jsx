import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ProjectForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: projects.concat([addProject]) },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "" || clientId === "") {
      return alert("Please fill in all fields");
    }

    addProject(name, description, clientId, status);

    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  if (loading) return null;
  if (error) return "Something Went Wrong";

  return (
    <div>
      <form
        className="p-8 shadow-sm shadow-gray-400 rounded-sm"
        onSubmit={onSubmit}>
        <div className="flex justify-center items-center mb-8">
          <FaList />
          <h1 className="px-2">Add Project</h1>
        </div>
        <input
          type="text"
          className="w-full p-2 border-none mb-3 shadow-sm shadow-gray-300 rounded-sm capitalize"
          placeholder="Name"
          autoCapitalize="true"
          autoComplete="false"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="w-full p-2 border-none mb-3 shadow-sm shadow-gray-300 rounded-sm"
          placeholder="description"
          rows={8}
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}></textarea>
        <select
          id="status"
          className="w-full p-2 border-none mb-3 shadow-sm shadow-gray-300 rounded-sm"
          value={status}
          onChange={(e) => setStatus(e.target.value)}>
          <option value="new">Not Started</option>
          <option value="progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          id="clientId"
          value={clientId}
          className="w-full p-2 border-none mb-3 shadow-sm shadow-gray-300 rounded-sm"
          onChange={(e) => setClientId(e.target.value)}>
          <option value="">Select Client</option>
          {data.clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
        <button type="submit" className="w-full p-2 bg-blue-400 text-white">
          SUBMIT
        </button>
      </form>
    </div>
  );
}

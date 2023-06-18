import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { FaList } from "react-icons/fa";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function UpdateProject({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState("");

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("Please fill out all fields");
    }

    updateProject({ name, description, status });
  };

  return (
    <div>
      <form
        className="p-8 shadow-sm shadow-gray-400 rounded-sm"
        onSubmit={onSubmit}>
        <div className="flex justify-center items-center mb-8">
          <FaList />
          <h1 className="px-2">Update Project</h1>
        </div>
        <input
          type="text"
          className="w-full p-2 border-none mb-3 shadow-sm shadow-gray-300 rounded-sm"
          placeholder="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="w-full p-2 border-none mb-3 shadow-sm shadow-gray-300 rounded-sm"
          placeholder="description"
          id="description"
          value={description}
          rows={8}
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

        <button type="submit" className="w-full p-2 bg-blue-400 text-white">
          SUBMIT
        </button>
      </form>
    </div>
  );
}

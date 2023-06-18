import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function ClientsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: clients.concat([addClient]) },
      });
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || phone === "") {
      return alert("Please fill in all fields");
    }
    addClient(name, email, phone);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div>
      <form
        className="p-8 shadow-sm shadow-gray-400 rounded-sm"
        onSubmit={onSubmit}>
        <div className="flex justify-center items-center mb-8">
          <FaUser />
          <h1 className="px-2">Add Client</h1>
        </div>
        <input
          type="text"
          className="w-full p-2 border-none mb-3 shadow-sm shadow-gray-300 rounded-sm"
          autoCapitalize="true"
          placeholder="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border-none mb-3 shadow-sm shadow-gray-300 rounded-sm"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 border-none mb-3 shadow-sm shadow-gray-300 rounded-sm"
          placeholder="Phone"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit" className="w-full p-2 bg-blue-400 text-white">
          SUBMIT
        </button>
      </form>
    </div>
  );
}

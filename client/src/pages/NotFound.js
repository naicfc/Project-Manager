import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center mt-20 text-gray-600">
      <FaExclamationTriangle className="text-red-600" size={50} />
      <h1>404</h1>
      <p>Sorry, this page does not exist</p>
      <Link to='/' className="underline text-blue-500 text-xl">Go Back</Link>
    </div>
  );
}

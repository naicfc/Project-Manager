import { FaSpinner } from "react-icons/fa";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <button type="button" className="text-gray-500" disabled>
        <FaSpinner size={50} />
      </button>
    </div>
  );
}

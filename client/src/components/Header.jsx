
export default function Header() {
  return (
    <div className="px-8 flex justify-between items-center py-4 shadow-sm">
      <div className="container text-gray-800">
        <a href="/" className="font-semibold text-lg uppercase">
          Project Manager
        </a>
      </div>
      <nav>
        <div className="flex justify-between items-center">
          <a className="px-4" href="/">
            Projects
          </a>
          <a className="px-4" href="/clients">
            Clients
          </a>
        </div>
      </nav>
    </div>
  );
}

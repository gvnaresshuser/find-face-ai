import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { ScanFace } from "lucide-react";

function Sidebar({ sidebarOpen, closeSidebar }) {
  const linkClass = ({ isActive }) =>
    `block p-3 rounded transition ${
      isActive ? "bg-indigo-600 text-white" : "hover:bg-gray-100"
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-full
          w-64
          bg-white
          shadow-xl
          z-50
          transform
          transition-transform
          duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
          lg:static
          lg:shadow
        `}
      >
        {/* Mobile Close Button */}
        <div className="bg-indigo-600 flex justify-between items-center p-4 border-b lg:hidden">
          {/* <h2 className="font-bold text-lg">
            📸 {import.meta.env.VITE_APPLICATION_TITLE}
          </h2> */}
          <h2 className="font-bold text-lg text-white flex items-center gap-2">
            <ScanFace className="w-8 h-8 text-white bg-indigo-600 animate-spin-y" />
            {import.meta.env.VITE_APPLICATION_TITLE}
          </h2>

          <button
            onClick={closeSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="text-white" size={22} />
          </button>
        </div>

        {/* Desktop spacing */}
        <div className="hidden lg:block h-4"></div>

        <nav className="space-y-2 p-4">
          <NavLink to="/" className={linkClass} onClick={closeSidebar}>
            Dashboard
          </NavLink>

          <NavLink to="/upload" className={linkClass} onClick={closeSidebar}>
            Upload Photos
          </NavLink>

          <NavLink to="/gallery" className={linkClass} onClick={closeSidebar}>
            Gallery
          </NavLink>

          <NavLink
            to="/selfie-search"
            className={linkClass}
            onClick={closeSidebar}
          >
            Selfie Search
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

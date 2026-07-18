import { Menu } from "lucide-react";
import { ScanFace } from "lucide-react";
function Navbar({ toggleSidebar }) {
  return (
    <header className="h-16 min-h-16 flex-shrink-0  bg-indigo-600 text-white flex items-center px-6 shadow">
      <button
        className="lg:hidden p-2 rounded-lg hover:bg-indigo-500 mr-3"
        onClick={toggleSidebar}
      >
        <Menu size={28} />
      </button>

      {/* <h1 className="text-2xl font-bold flex-shrink-0">
        📸 {import.meta.env.VITE_APPLICATION_TITLE}
      </h1> */}
      <h2 className="font-bold text-lg flex items-center gap-2">
        <ScanFace className="w-8 h-8 text-white animate-spin-y" />
        {import.meta.env.VITE_APPLICATION_TITLE}
      </h2>
    </header>
  );
}

export default Navbar;

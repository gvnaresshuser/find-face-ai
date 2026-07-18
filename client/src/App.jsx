import {useState} from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <div className="h-screen flex flex-col">
        <Navbar toggleSidebar={() => setSidebarOpen(true)} />
        <div className="flex flex-1">
          <Sidebar
            sidebarOpen={sidebarOpen}
            closeSidebar={() => setSidebarOpen(false)}
          />

          <main className="flex-1 bg-gray-100 p-4 md:p-6 overflow-auto">
            <AppRoutes />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

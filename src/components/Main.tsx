import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Outlet />
      </main>
    </>
  );
}

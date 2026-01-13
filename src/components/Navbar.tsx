import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-black/80">
      <div className="max-w-7xl mx-auto flex gap-6 p-4">
        <NavLink to="/">Home</NavLink>
      </div>
    </nav>
  );
}
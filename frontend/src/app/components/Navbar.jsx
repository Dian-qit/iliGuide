import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookingDestination, setBookingDestination] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const { logout } = useLogout();
  const { user } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-[#141A17] shadow-lg" : "bg-transparent absolute"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        <a
          href="/"
          className="flex items-center gap-3 group transition-all duration-500 tracking-[0.2em]"
        >
          <span className="font-serif text-4xl tracking-wider font-extralight text-white">
            IlIGuide
          </span>
        </a>

        <div className="hidden md:flex items-center gap-15 font-sans text-sm tracking-[0.2em] text-white/90">
          <a href="/" className="hover:text-[#006c46] transition-colors">
            EXPLORE
          </a>
          <a
            href="/tourist-spots"
            className="hover:text-[#006c46] transition-colors"
          >
            DESTINATIONS
          </a>
          <a
            href="/activities"
            className="hover:text-[#006c46] transition-colors text-nowrap"
          >
            ACTIVITIES
          </a>
        </div>

        <div>
          {user && (
            <div className="flex items-center gap-10 text-white uppercase tracking-widest text-sm">
              <span>Hello {user.Name || user.name || user.email || "Guest"}</span>
              <button className="uppercase tracking-widest py-1 px-3  hover:scale-105 duration-300 bg-white text-black  hover:bg-[#006c46] transition-al text-xs hover:font-medium" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

          {!user && (
            <div>
              <Link
                to="/login"
                className="bg-transparent px-6 py-2 rounded-full tracking-widest text-sm font-sans transition-all duration-200 uppercase cursor-pointer text-white hover:bg-[#006c46] hover:text-[#1C2421]"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-transparent px-6 py-2 rounded-full tracking-widest text-sm font-sans transition-all duration-200 uppercase cursor-pointer text-white hover:bg-[#006c46] hover:text-[#1C2421] ml-2"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

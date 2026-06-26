import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { logout } = useLogout();
  const { user } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
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
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-all duration-500 tracking-[0.2em]"
          >
            <span className="font-serif text-4xl tracking-wider font-extralight text-white">
              IlIGuide
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-15 font-sans text-sm tracking-[0.2em] text-white/90">
            <Link to="/" className="hover:text-[#006c46] transition-colors">
              EXPLORE
            </Link>

            <Link
              to="/tourist-spots"
              className="hover:text-[#006c46] transition-colors"
            >
              DESTINATIONS
            </Link>

            <Link
              to="/activities"
              className="hover:text-[#006c46] transition-colors text-nowrap"
            >
              ACTIVITIES
            </Link>
          </div>

          {/* Right Side */}
          <div>
            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-white hover:text-[#006c46] transition-colors"
            >
              <Menu size={32} />
            </button>

            {/* Desktop Auth */}
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center gap-10 text-white uppercase tracking-widest text-sm">
                  <span>
                    Hello {user.Name || user.name || user.email || "Guest"}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="uppercase tracking-widest py-1 px-3 hover:scale-105 duration-300 bg-white text-black hover:bg-[#006c46] transition-all text-xs hover:font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
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
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 bg-[#141A17] z-[999] flex flex-col justify-center items-center transition-all duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 text-white hover:text-[#006c46] transition-colors"
        >
          <X size={40} />
        </button>

        <div className="flex flex-col items-center gap-10 text-white uppercase tracking-[0.3em] text-2xl">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-[#006c46] transition-colors"
          >
            Explore
          </Link>

          <Link
            to="/tourist-spots"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-[#006c46] transition-colors"
          >
            Destinations
          </Link>

          <Link
            to="/activities"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-[#006c46] transition-colors"
          >
            Activities
          </Link>

          {user ? (
            <>
              <span className="text-sm tracking-widest opacity-70">
                {user.Name || user.name || user.email}
              </span>

              <button
                onClick={handleLogout}
                className="border border-white px-6 py-3 text-sm hover:bg-white hover:text-black transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#006c46] transition-colors"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-[#006c46] transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

import  { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[2147483647] transition-all duration-300",
        isScrolled
          ? "py-1 sm:py-2 md:py-3 bg-white/80 backdrop-blur-md shadow-md"
          : "py-3 sm:py-4 md:py-5 bg-white/50 backdrop-blur shadow"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <a 
            href="#home" 
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          aria-label="Vault"
        >
          <img 
            src="/logo.png" 
            alt="Pulse Robot Logo" 
            className="h-12 sm:h-12 " 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 font-display text-lg">
          <a 
            href="#home" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Home
          </a>
          <a href="#why-raw-bot" className="nav-link">Why Vault ?</a>
          <a href="#showcase" className="nav-link">Showcase</a>
          <a href="#newsletter" className="nav-link">Contact</a>
        </nav>

        {/* Mobile menu button - increased touch target */}
        <button 
          className="md:hidden text-gray-700 p-3 focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - dropdown panel under header */}
      <div className={cn(
        "absolute top-full left-0 right-0 z-40 bg-white md:hidden transition-all duration-300 ease-in-out shadow-lg border-b border-gray-200",
        isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-4 items-stretch p-4 pt-12">
          <a 
            href="#home" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Home
          </a>
          <a 
            href="#why-raw-bot" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Why Vault ?
          </a>
          <a 
            href="#showcase" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Showcase
          </a>
          <a 
            href="#newsletter" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

'use client';
import  { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
// Removed Spline import; using static image instead
 
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [lottieData, setLottieData] = useState<string>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch('/loop-header.lottie')
      .then(response => response.json())
      .then(data => setLottieData(data))
      .catch(error => console.error("Error loading Lottie animation:", error));
  }, []);

  useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      
      const {
        left,
        top,
        width,
        height
      } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);
  
  useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      elements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const yPos = -scrollY * speed;
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  return (
    <section 
      className="overflow-hidden relative bg-none" 
      id="hero" 
      style={{
        backgroundImage: 'url("/hero-bg.webp")',
        backgroundPosition: 'center 20%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: isMobile ? '100px 12px 40px' : '120px 20px 100px'
      }}
    >  
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-pulse-gradient opacity-20 blur-3xl rounded-full"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <div 
              className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pulse-500 text-white mr-2">01</span>
              <span>Purpose</span>
            </div>
            
            <h1 
              className="section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.3s" }}
            >
              Smarter Lending for<br className="hidden sm:inline" />Smarter Students.
            </h1>
            
            <p 
              style={{ animationDelay: "0.5s" } } 
              className="section-subtitle mt-3 sm:mt-6 mb-4 sm:mb-8 leading-relaxed opacity-0 animate-fade-in text-gray-950 font-normal text-base sm:text-lg text-left text-[#FC4D0A]"
            >
            <i>Vault gives students loans at 0% interest.</i> 
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.7s" }}
            >
              <a 
                href="#newsletter" 
                className="flex items-center justify-center group w-full sm:w-auto text-center hover:bg-purple-800 transition-colors duration-300 ease-in-out"
                style={{
                  backgroundColor: '#a855f7',
                  borderRadius: '1440px',
                  boxSizing: 'border-box',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '14px',
                  lineHeight: '20px',
                  padding: '16px 24px', 
                  border: '1px solid white',
                  textDecoration: 'none',                  
                }}
              >
                Join Waitlist
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-[53%] relative mt-6 lg:mt-0">           
              <div className="absolute inset-0 bg-dark-900 rounded-2xl sm:rounded-3xl -z-10 shadow-lg"></div>
              <div className="relative transition-all duration-300 ease-out overflow-hidden rounded-2xl sm:rounded-3xl group mockup-container">
              <div className="relative mockup-card">
              <img
                src="/mockup.png"
                alt="Vault robot showcase"
                className="w-full h-full object-cover select-none"
              />
              {/* Finance-themed icons positioned AROUND the mockup with subtle float, not overlapping */}
              <div className="pointer-events-none">
                {/* Top-left coin */}
                <div className="orb-icon float-xy" style={{ position: 'absolute', top: '10%', left: '23%' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <defs>
                      <linearGradient id="coinGradA" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FDE68A"/>
                        <stop offset="100%" stopColor="#F59E0B"/>
                      </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="10" fill="url(#coinGradA)" stroke="#D97706" strokeWidth="1" />
                    <text x="12" y="15" textAnchor="middle" fontSize="10" fill="#78350F">$</text>
                  </svg>
                </div>
                {/* Right-side card */}
                <div className="orb-icon float-xy" style={{ position: 'absolute', top: '24%', right: '12%' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <rect x="3" y="6" width="18" height="12" rx="2" fill="#8B5CF6" />
                    <rect x="3" y="9" width="18" height="2" fill="#7C3AED" />
                    <rect x="6" y="13" width="5" height="3" rx="1" fill="#EDE9FE" />
                  </svg>
                </div>
                {/* Bottom-left bank */}
                <div className="orb-icon float-xy" style={{ position: 'absolute', bottom: '13%', left: '10%' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path d="M12 4 3 8v2h18V8L12 4Z" fill="#A78BFA" />
                    <path d="M5 10v7h2v-7H5Zm4 0v7h2v-7H9Zm4 0v7h2v-7h-2Zm4 0v7h2v-7h-2Z" fill="#4C1D95" />
                    <rect x="3" y="18" width="18" height="2" rx="1" fill="#C4B5FD" />
                  </svg>
                </div>
                {/* Bottom-right chart */}
                <div className="orb-icon float-xy" style={{ position: 'absolute', bottom: '33%', right: '34%' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path d="M4 18h16" stroke="#9333EA" strokeWidth="2" strokeLinecap="round" />
                    <rect x="6" y="12" width="2" height="6" rx="1" fill="#C084FC" />
                    <rect x="11" y="9" width="2" height="9" rx="1" fill="#A855F7" />
                    <rect x="16" y="6" width="2" height="12" rx="1" fill="#7C3AED" />
                  </svg>
                </div>
              </div>
            </div>              
          </div>              
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-pulse-100/30 rounded-full blur-3xl -z-10 parallax" data-speed="0.05"></div>
    </section>
  );
};

export default Hero;

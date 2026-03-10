import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Menu, X, ChevronDown } from 'lucide-react';
import logo from './assets/logo.png';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const springX = useSpring(0, { stiffness: 150, damping: 20 });
  const springY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);
    };
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('.premium-card') ||
        target.closest('.nav-link') ||
        target.closest('.btn-premium') ||
        target.closest('.social-link') ||
        target.closest('.footer-link-item') ||
        target.closest('.dropdown-item')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        className="custom-cursor"
        style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }}
      />
      <motion.div
        className="custom-cursor-follower"
        style={{
          x: springX,
          y: springY,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`,
          opacity: isHovering ? 0.2 : 0.5,
          borderColor: isHovering ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.3)',
        }}
      />
    </>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isExpertiseOpen, setIsExpertiseOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileOpen]);

  // For links on other pages to scroll properly on home
  const getHref = (id: string) => {
    if (location.pathname === '/') return `#${id}`;
    return `/#${id}`;
  };

  return (
    <nav className={`nav-premium ${scrolled ? 'compact' : ''}`}>
      <div className="container nav-content">
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>
          <img src={logo} alt="Groupe ADEV" className="logo-image" />
        </Link>
        <div className="nav-menus">
          <div className="nav-links">
            <div className="nav-dropdown-wrapper">
              <a href={getHref('expertise')} className="nav-link nav-dropdown-trigger">Expertise</a>
              <div className="nav-dropdown">
                <Link to="/expertise/developpement" className="dropdown-item">Développement</Link>
                <Link to="/expertise/design" className="dropdown-item">Design Architectural</Link>
                <Link to="/expertise/branding" className="dropdown-item">Branding de Prestige</Link>
              </div>
            </div>
            <a href={getHref('vision')} className="nav-link">Vision</a>
            <a href={getHref('portfolio')} className="nav-link" onClick={() => setIsMobileOpen(false)}>Portfolio</a>
            <a href={getHref('contact')} className="nav-link" onClick={() => setIsMobileOpen(false)}>Contact</a>
          </div>
          <a href={getHref('contact')} className="btn-premium nav-btn-desktop">Nous contacter</a>
          <button className="mobile-menu-btn" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(15px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="mobile-menu-overlay"
          >
            <div className="mobile-menu-content">
              <Link to="/" className="mobile-menu-link" onClick={() => setIsMobileOpen(false)}>Accueil</Link>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <a href={getHref('expertise')} className="mobile-menu-link" style={{ borderBottom: 'none' }} onClick={() => setIsMobileOpen(false)}>Expertise</a>
                <button
                  onClick={() => setIsExpertiseOpen(!isExpertiseOpen)}
                  style={{ background: 'transparent', border: 'none', color: '#fff', padding: '1rem', cursor: 'pointer' }}
                >
                  <ChevronDown size={20} style={{ transition: 'transform 0.3s', transform: isExpertiseOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                </button>
              </div>

              <AnimatePresence>
                {isExpertiseOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '-0.5rem', marginBottom: '0.5rem' }}
                  >
                    <Link to="/expertise/developpement" className="mobile-menu-sublink" style={{ marginTop: '0.5rem' }} onClick={() => setIsMobileOpen(false)}>— Développement</Link>
                    <Link to="/expertise/design" className="mobile-menu-sublink" onClick={() => setIsMobileOpen(false)}>— Design Architectural</Link>
                    <Link to="/expertise/branding" className="mobile-menu-sublink" onClick={() => setIsMobileOpen(false)}>— Branding de Prestige</Link>
                  </motion.div>
                )}
              </AnimatePresence>

              <a href={getHref('vision')} className="mobile-menu-link" onClick={() => setIsMobileOpen(false)}>Vision</a>
              <a href={getHref('portfolio')} className="mobile-menu-link" onClick={() => setIsMobileOpen(false)}>Portfolio</a>
              <a href={getHref('contact')} className="mobile-menu-link" onClick={() => setIsMobileOpen(false)}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const location = useLocation();
  const getHref = (id: string) => {
    if (location.pathname === '/') return `#${id}`;
    return `/#${id}`;
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img src={logo} alt="Groupe ADEV" className="footer-logo" />
            </div>
            <p className="footer-about">
              Le partenaire stratégique exclusif des promoteurs immobiliers qui exigent l'absolu. Développement, design et marketing de luxe.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Héritage</h4>
            <ul className="footer-links-list">
              <li><a href={getHref('expertise')} className="footer-link-item">Expertise</a></li>
              <li><a href={getHref('vision')} className="footer-link-item">Philosophie</a></li>
              <li><a href={getHref('contact')} className="footer-link-item">Initiation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Le Studio</h4>
            <div className="contact-row"><Mail size={16} /> <span>privé@groupeadev.com</span></div>
            <div className="contact-row"><Phone size={16} /> <span>+1 (514) 888-ADEV</span></div>
            <div className="contact-row"><MapPin size={16} /> <span>Vieux-Montréal, Canada</span></div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="copyright-text">&copy; {new Date().getFullYear()} Groupe ADEV. Tous Droits Réservés.</span>
          <div className="footer-socials">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Journal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout = () => {
  return (
    <>
      <div className="architect-lines" />
      <div className="aurora-glow" />
      <CustomCursor />
      <Navbar />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

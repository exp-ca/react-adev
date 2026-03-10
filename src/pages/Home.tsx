import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Building2, Paintbrush, BarChart3, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExpertiseCard = ({ icon, title, desc, delay, fullWidth = false, link }: { icon: any, title: string, desc: string, delay: number, fullWidth?: boolean, link: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className={`premium-card ${fullWidth ? 'expertise-card-full' : ''}`}
    >
      <div
        className="spotlight"
        style={{ '--x': `${mousePos.x}%`, '--y': `${mousePos.y}%` } as any}
      />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div className="card-icon">
          {icon}
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
        <Link to={link} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--accent-gold)', textDecoration: 'none' }}>
          Explorer <ArrowUpRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
};

const TypewriterText = () => {
  const words = ["Architecture intelligente et durable.", "Développement immobilier stratégique.", "Environnement urbain maîtrisé.", "Vision au-delà des plans."];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const t = setTimeout(() => setReverse(true), 2000);
      return () => clearTimeout(t);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 80);

    return () => clearTimeout(t);
  }, [subIndex, index, reverse]);

  return (
    <span className="text-gold hero-typewriter">
      {words[index].substring(0, subIndex)}
    </span>
  );
};

export const Home = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="hero-bg">
          <div className="hero-overlay" />
          <img src="/src/assets/hero.png.png" alt="Architecture" />
        </motion.div>

        <div className="container hero-content-wrapper">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.2 }} className="hero-titles">
            <h1 className="display-text">
              Bâtir<br />
              <span style={{ fontWeight: 400 }}>VOTRE VISION</span>
            </h1>
            <TypewriterText />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="hero-cta">
            <a href="#expertise" className="btn-premium">
              L'IMMERSION <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="section">
        <div className="container">
          <div className="expertise-layout">
            <div className="expertise-sidebar">
              <div className="expertise-intro">
                <span className="section-label">Expertise</span>
                <h2 className="sub-display">Nous bâtissons <span className="text-gold italic">le futur</span> exclusif de l'immobilier.</h2>
                <div style={{ height: '1px', width: '20%', background: 'var(--accent-gold)', opacity: 0.3, margin: '2rem 0' }} />
                <p className="expertise-desc">
                  Notre cabinet d'élite fusionne stratégie réglementaire, conception architecturale et marketing de projet pour sécuriser et valoriser vos actifs immobiliers.
                </p>
                <div className="expertise-stats">
                  <div>
                    <span className="stat-item-number">20+</span>
                    <span className="stat-item-label">Ans D'Expertise</span>
                  </div>
                  <div>
                    <span className="stat-item-number">100%</span>
                    <span className="stat-item-label">Conformité</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="expertise-grid">
              <ExpertiseCard delay={0.1} link="/expertise/developpement" icon={<Building2 size={36} />} title="Développement Stratégique" desc="Conception résidentielle et multi-logements alliant rigueur technique, conformité urbaine et vision durable." />
              <ExpertiseCard delay={0.2} link="/expertise/design" icon={<Paintbrush size={36} />} title="Architecture & Design" desc="Conception résidentielle et multi-logements alliant rigueur technique, conformité urbaine et vision durable." />
              <ExpertiseCard delay={0.3} link="/expertise/branding" icon={<BarChart3 size={36} />} title="Image & Mise en marché" desc="Branding de projet et outils marketing stratégiques pour maximiser la désirabilité et accélérer la vente." fullWidth />
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="section" style={{ backgroundColor: 'rgba(5,5,5,0.8)' }}>
        <div className="container">
          <div className="vision-layout">
            <motion.div
              style={{ x: useTransform(scrollYProgress, [0.5, 0.9], [-40, 40]) }}
              className="vision-image-wrapper"
            >
              <div className="vision-image-border" />
              <img src="/src/assets/photo_3.jpg" alt="La Vision" />
            </motion.div>
            <div className="vision-content">
              <span className="section-label">Vision</span>
              <h2 className="vision-quote">"L'excellence est le résultat du <span className="text-gold">soin infini</span> apporté aux détails invisibles."</h2>
              <p className="expertise-desc" style={{ maxWidth: '90%' }}>
                Nous ne concevons pas simplement des espaces ; nous sculptons le temps. Notre approche refuse le compromis afin d'offrir une expérience sensorielle, résidentielle et commerciale inégalée.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                style={{ marginTop: '3rem' }}
              >
                <Link to="/expertise/developpement" className="btn-premium">
                  EN SAVOIR PLUS <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="portfolio" className="gallery-section">
        <div className="container" style={{ padding: '0 2rem' }}>
          <div className="gallery-grid">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }} className="gallery-item">
              <img src="/src/assets/photo_1.jpg" alt="Portfolio 1" />
              <div className="gallery-overlay">
                <span className="gallery-caption">Résidence 01</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} viewport={{ once: true }} className="gallery-item gallery-item-stagger">
              <img src="/src/assets/photo_2.jpg" alt="Portfolio 2" />
              <div className="gallery-overlay">
                <span className="gallery-caption">Résidence 02</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} viewport={{ once: true }} className="gallery-item">
              <img src="/src/assets/photo_3.jpg" alt="Portfolio 3" />
              <div className="gallery-overlay">
                <span className="gallery-caption">Édifices</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info">
              <span className="section-label">Initiation</span>
              <h2 className="sub-display" style={{ marginBottom: '2rem' }}>Démarrer<br /><span className="text-gold italic">un projet.</span></h2>
              <p className="expertise-desc">
                Confiez-nous votre vision brute. Nous la sculpterons en un héritage architectural et commercial sans compromis.
              </p>
              <div style={{ marginTop: '4rem' }}>
                <div className="contact-row" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}><Mail size={20} /> <span>privé@groupeadev.com</span></div>
                <div className="contact-row" style={{ fontSize: '1.1rem' }}><Phone size={20} /> <span>+1 (514) 888-ADEV</span></div>
              </div>
            </div>

            <div className="contact-form-container">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="contact-input-group">
                  <input type="text" id="name" className="contact-input" placeholder=" " required />
                  <label htmlFor="name" className="contact-label">Nom Complet</label>
                </div>
                <div className="contact-input-group">
                  <input type="text" id="company" className="contact-input" placeholder=" " />
                  <label htmlFor="company" className="contact-label">Entreprise (Optionnel)</label>
                </div>
                <div className="contact-input-group">
                  <input type="email" id="email" className="contact-input" placeholder=" " required />
                  <label htmlFor="email" className="contact-label">Courriel Privé</label>
                </div>
                <div className="contact-input-group">
                  <input type="text" id="vision" className="contact-input" placeholder=" " required />
                  <label htmlFor="vision" className="contact-label">Votre Vision</label>
                </div>
                <button type="submit" className="btn-premium" style={{ width: '100%', marginTop: '2rem', justifyContent: 'center' }}>
                  Soumettre la Requête <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import photo3 from '../assets/photo_3.jpg';

export const Branding = () => {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '8rem' }}>
      <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
            <span className="section-label">Expertise // 03</span>
            <h1 className="display-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', marginBottom: '2rem' }}>
              BRANDING<br />
              <span className="text-gold italic" style={{ fontWeight: 300, fontSize: '0.8em', textTransform: 'none' }}>de prestige et go-to-market.</span>
            </h1>
            <p className="expertise-desc" style={{ maxWidth: '800px', fontSize: '1.25rem' }}>
              Un chef-d'œuvre invisible ne vaut rien. Nous enveloppons vos développements d'une aura de désirabilité absolue qui captive des acheteurs d'élite et justifie des prix premiums.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ padding: '0 0 10rem 0' }}>
        <div className="container">
          <div className="vision-layout">
            <motion.div 
              style={{ x: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
              className="vision-image-wrapper"
            >
              <div className="vision-image-border" />
              <img src={photo3} alt="Branding & Marketing" style={{ height: '800px' }} />
            </motion.div>
            <div className="vision-content">
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>L'Économie du Désir</h3>
              <p className="expertise-desc" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Notre studio créatif interne conçoit des marques immobilières immersives. Du naming à la campagne de lancement VIP, nous sculptons la perception pour maximiser la rentabilité.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Naming & Identité Visuelle', 'Rendus Audiovisuels & 3D', 'Stratégies de Vente Privées', 'Marketing Expérientiel'].map((item, i) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    viewport={{ once: true }}
                    style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-dim)', color: '#fff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  >
                    <span className="text-gold" style={{ marginRight: '1rem' }}>0{i + 1}</span> {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

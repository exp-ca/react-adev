import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Design = () => {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '8rem' }}>
      <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
            <span className="section-label">Expertise // 02</span>
            <h1 className="display-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', marginBottom: '2rem' }}>
              DESIGN<br />
              <span className="text-gold italic" style={{ fontWeight: 300, fontSize: '0.8em', textTransform: 'none' }}>architectural intemporel.</span>
            </h1>
            <p className="expertise-desc" style={{ maxWidth: '800px', fontSize: '1.25rem' }}>
              Le design n'est pas qu'une question d'esthétique, c'est l'intelligence de l'espace. Nous concevons des environnements qui respirent le luxe silencieux et qui résistent à l'épreuve du temps.
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
              <img src="/src/assets/photo_2.jpg" alt="Design Architecture" style={{ height: '800px' }} />
            </motion.div>
            <div className="vision-content">
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>L'Art de la Proportion</h3>
              <p className="expertise-desc" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Nos concepts architecturaux s'inspirent des maîtres classiques tout en adoptant la technologie moderne. Une fusion parfaite de lumière, de matériaux nobles et de fonction.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Planification Spatiale', 'Design Intérieur', 'Conception Extérieure & Façades', 'Sélection des Matériaux'].map((item, i) => (
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

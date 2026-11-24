import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LogoProvider } from './context/LogoContext';

const PREPARED_SECTION_IDS = [
  'home',
  'about',
  'services',
  'gallery',
  'contact',
  'booking',
] as const;

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sections = PREPARED_SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id !== 'booking') {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <LogoProvider>
      <div className="min-h-screen flex flex-col bg-[#F5EBDD] text-[#301A16] overflow-x-clip">
        <Header activeSection={activeSection} onNavigate={setActiveSection} />

        <main className="flex-1 bg-[#F5EBDD]">
          <HeroSection onNavigate={setActiveSection} />

          {/* Clean architectural stage reserving anchor IDs for subsequent landing page sections */}
          <div id="about" className="scroll-mt-20 min-h-[16vh]" />
          <div id="services" className="scroll-mt-20 min-h-[16vh]" />
          <div id="gallery" className="scroll-mt-20 min-h-[16vh]" />
          <div id="contact" className="scroll-mt-20 min-h-[14vh]" />
          <div id="booking" className="scroll-mt-20 min-h-[10vh]" />
        </main>

        <Footer onNavigate={setActiveSection} />
      </div>
    </LogoProvider>
  );
}

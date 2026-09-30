import { useState } from 'react';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ProcessSection } from './sections/ProcessSection';
import { TrustSection } from './sections/TrustSection';
import { PricingSection } from './sections/PricingSection';
import { FAQSection } from './sections/FAQSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import type { Project } from './types';

export function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30 selection:text-white has-custom-cursor">
      {/* Desktop Custom Follower Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Sections in Exact Required Order */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
        <ProcessSection />
        <TrustSection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;

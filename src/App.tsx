import { useEffect, useState } from 'react';
import { useSiteScroll } from './hooks/useWeb3DScroll';
import { useScrollReveals } from './hooks/useScrollReveals';
import { Navbar } from './components/UI/Navbar';
import { ScrollProgress } from './components/UI/ChromeUI';
import { HeroSection } from './components/UI/HeroSection';
import { WorkActs } from './components/UI/WorkActs';
import { ProjectsSection } from './components/UI/ProjectsSection';
import { ServicesSection } from './components/UI/ServicesSection';
import { ProcessSection } from './components/UI/ProcessSection';
import { ContactSection } from './components/UI/ContactSection';
import { Footer } from './components/UI/Footer';
import { ResumeModal } from './components/UI/ResumeModal';
import { ProjectModal } from './components/UI/ProjectModal';
import type { Project } from './types';

export default function App() {
  const { progressRef, activeSection, scrollTo, setScrollLocked } = useSiteScroll();
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useScrollReveals();

  useEffect(() => {
    setScrollLocked(resumeOpen || activeProject !== null);
  }, [resumeOpen, activeProject, setScrollLocked]);

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    scrollTo('contact');
  };

  const handleOpenResume = () => setResumeOpen(true);
  const handleOpenProject = (project: Project) => setActiveProject(project);

  return (
    <div className="relative min-h-screen bg-ink text-bone">
      <ScrollProgress progressRef={progressRef} />
      <Navbar
        onNavigate={scrollTo}
        activeSection={activeSection}
        setScrollLocked={setScrollLocked}
        onOpenResume={handleOpenResume}
      />

      <main className="relative z-10">
        <HeroSection onNavigate={scrollTo} onOpenResume={handleOpenResume} />
        <WorkActs onOpenProject={handleOpenProject} />
        <ProjectsSection onOpenProject={handleOpenProject} onNavigate={scrollTo} />
        <ServicesSection onSelectService={handleSelectService} onNavigate={scrollTo} />
        <ProcessSection />
        <ContactSection
          key={selectedService ?? 'default'}
          initialService={selectedService}
          onOpenResume={handleOpenResume}
        />
      </main>

      <Footer onNavigate={scrollTo} onOpenResume={handleOpenResume} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

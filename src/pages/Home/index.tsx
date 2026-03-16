import HeroSection from '../../components/sections/HeroSection';
import AboutSection from '../../components/sections/AboutSection';
import SkillsSection from '../../components/sections/SkillsSection';
import FeaturedProjects from '../../components/sections/FeaturedProjects';
import ServicesSection from '../../components/sections/ServicesSection';
import TestimonialsSection from '../../components/sections/TestimonialsSection';
import CTASection from '../../components/sections/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjects />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}

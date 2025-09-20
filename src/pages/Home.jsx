import { useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const Home = () => {
  // Set page title for SEO
  useEffect(() => {
    document.title = 'SkillHub - Learn and Grow Skills';
    // Optional: Add meta description dynamically
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        'SkillHub helps you track, improve, and showcase your skills with community engagement.'
      );
    }
  }, []);

  return (
    <main>
      <Hero />
      <About />
      <Features />
      <Testimonials />
      <CTA />
    </main>
  );
};

export default Home;

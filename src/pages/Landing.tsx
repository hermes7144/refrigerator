import Features from '../components/landing/features';
import Hero from '../components/landing/hero';
import Testimonials from '../components/landing/testimonials';
import Zigzag from '../components/landing/zigzag';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import '../css/additional-styles/utility-patterns.css';
import Footer from '../components/landing/footer';

export default function Landing() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Hero />
      <Features />
      <Zigzag />
      <Testimonials />
      <Footer />
    </>
  );
}

import { useEffect, useState } from "react";
import Background from "./components/Background";
import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Achievements from "./sections/Achievements";
import OutsideOfCoding from "./sections/OutsideOfCoding";
import Contact from "./sections/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen show={loading} />
      <Background />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Achievements />
        <OutsideOfCoding />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}

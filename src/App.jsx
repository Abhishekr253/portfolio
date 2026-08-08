import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Projects from "./components/Projects/SelectedWork";
import Services from "./components/services/Services";
import Footer from "./components/footer/Footer";

export default function App() {
  return (
    <>
      <Hero />

      <About />

      <Projects />

      <Services />

      <Footer />
    </>
  );
}
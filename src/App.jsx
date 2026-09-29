import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Projects from "./components/Projects/SelectedWork";
import Services from "./components/services/Services";
import Footer from "./components/footer/Footer";
import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import FAQ from "./faq/Faq";

export default function App() {
  return (
    <>
      <SmoothScroll />

      <main>
        <Hero />

        <About />

        <Projects />

        <Services />

        <FAQ />
      </main>

      <Footer />
    </>
  );
}
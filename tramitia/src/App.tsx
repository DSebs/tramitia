import './App.css'
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TramitesGrid from './components/TramitesGrid';
import AboutUs from './components/AboutUs';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Hero />
        <TramitesGrid />
        <AboutUs />
        <PricingSection />
        <Footer />
      </div>
    </>
  )
}

export default App

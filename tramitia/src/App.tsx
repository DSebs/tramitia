import './App.css'
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TramitesGrid from './components/TramitesGrid';

function App() {

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <Hero />
        <TramitesGrid />
      </div>
    </>
  )
}

export default App

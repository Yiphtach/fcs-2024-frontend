import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Characters from './pages/Characters';
import About from './pages/About';
import CharacterDetails from './pages/CharacterDetails';
import FightResults from './pages/FightResults';
import FightSetup from './pages/FightSetup.jsx';
import Gallery from './pages/Gallery.jsx';
import Leaderboards from './pages/Leaderboards.jsx';
import './styles/styles.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharacterDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/fights" element={<FightSetup />} />
            <Route path="/fight-results" element={<FightResults />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            {/* Fallback or NotFound route can be added here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

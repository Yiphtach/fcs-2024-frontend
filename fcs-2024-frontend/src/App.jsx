import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './Pages/HomePage';
import Characters from './Pages/Characters';
import About from './Pages/About';
import CharacterDetails from './Pages/CharacterDetails';
import FightResults from './Pages/FightResults';
import FightSetup from './Pages/FightSetup';
import Gallery from './Pages/Gallery';
import Leaderboards from './Pages/Leaderboards';

// Optionally, import global CSS if not done in the entry point
// import '../Styles/Styles.css';

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

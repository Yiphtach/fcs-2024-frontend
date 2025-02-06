import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/styles.css';

// Regular imports
import HomePage from './pages/HomePage';
import Characters from './pages/Characters';
import About from './pages/About';
import CharacterDetails from './pages/CharacterDetails';

// Lazy loaded components
const FightResults = lazy(() => import('./pages/FightResults'));
const FightSetup = lazy(() => import('./pages/FightSetup'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Leaderboards = lazy(() => import('./pages/Leaderboards'));

// Loading Component
const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading awesome content...</p>
  </div>
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Oops! Something went wrong.</h2>
          <p>Please try refreshing the page or contact support if the issue persists.</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Route configuration
const ROUTES = [
  { path: '/', element: <HomePage />, exact: true },
  { path: '/characters', element: <Characters /> },
  { path: '/characters/:id', element: <CharacterDetails /> },
  { path: '/about', element: <About /> },
  { path: '/fights', element: <FightSetup />, suspense: true },
  { path: '/fight-results', element: <FightResults />, suspense: true },
  { path: '/gallery', element: <Gallery />, suspense: true },
  { path: '/leaderboards', element: <Leaderboards />, suspense: true },
];

// NotFound component
const NotFound = () => (
  <div className="not-found">
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <a href="/" className="back-home">
      Return to Home
    </a>
  </div>
);

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {ROUTES.map(({ path, element, exact }) => (
                  <Route 
                    key={path}
                    path={path}
                    element={element}
                    exact={exact}
                  />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
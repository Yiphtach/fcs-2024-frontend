import React, { Suspense, lazy, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { CharacterProvider } from './context/CharacterContext';
import './App.css';

// Regular imports for frequently accessed pages
import HomePage from './pages/HomePage';
import Characters from './pages/Characters';
import About from './pages/About';
import CharacterDetails from './pages/CharacterDetails';

// Lazy loaded components for less frequently accessed pages
const FightResults = lazy(() => import('./pages/FightResults'));
const FightSetup = lazy(() => import('./pages/FightSetup'));
const Gallery = lazy(() => import('./pages/GalleryPage'));
const Leaderboards = lazy(() => import('./pages/Leaderboards'));
const CharacterSelections = lazy(() => import('./pages/CharacterSelection'));

// Loading Component with animation
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    <p className="ml-3 text-lg font-medium">Loading awesome content...</p>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
            <p className="text-gray-600 mb-4">
              Please try refreshing the page or contact support if the issue persists.
            </p>
            <details className="mb-4">
              <summary className="cursor-pointer text-blue-600">Technical Details</summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto text-sm">
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Route configuration with metadata
const ROUTES = [
  { 
    path: '/', 
    element: <HomePage />, 
    exact: true,
    preload: false
  },
  { 
    path: '/characters', 
    element: <Characters />, 
    preload: false
  },
  { 
    path: '/character/:id', 
    element: <CharacterDetails />, 
    preload: false
  },
  { 
    path: '/about', 
    element: <About />, 
    preload: false
  },
  { 
    path: '/fight-setup', 
    element: <FightSetup />, 
    suspense: true,
    preload: true
  },
  { 
    path: '/fight-results', 
    element: <FightResults />, 
    suspense: true,
    preload: true
  },
  { 
    path: '/gallery', 
    element: <Gallery />, 
    suspense: true,
    preload: true
  },
  { 
    path: '/leaderboards', 
    element: <Leaderboards />, 
    suspense: true,
    preload: true
  },
  { 
    path: '/character-selection', 
    element: <CharacterSelections />, 
    suspense: true,
    preload: true
  }
];

// Enhanced NotFound component
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h2>
      <p className="text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <a 
        href="/" 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        Return to Home
      </a>
    </div>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Preload components marked for preloading
    const preloadComponents = async () => {
      try {
        const preloadRoutes = ROUTES.filter(route => route.preload);
        await Promise.all(preloadRoutes.map(route => {
          if (typeof route.element.type === 'function') {
            return route.element.type();
          }
          return Promise.resolve();
        }));
      } catch (error) {
        console.error('Error preloading components:', error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    preloadComponents();
  }, []);

  if (!initialized) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <ErrorBoundary>
        <CharacterProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Suspense fallback={<LoadingSpinner />}>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <Routes>
                    {ROUTES.map(({ path, element, exact }) => (
                      <Route 
                        key={path}
                        path={path}
                        element={
                          <ErrorBoundary>
                            {element}
                          </ErrorBoundary>
                        }
                        exact={exact}
                      />
                    ))}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                )}
              </Suspense>
            </main>
            <Footer />
          </div>
        </CharacterProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
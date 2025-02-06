import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  Swords, 
  ChartBar, 
  BarChart3, 
  Users, 
  Trophy,
  ArrowRight 
} from 'lucide-react';

// Memoized Feature Card Component
const FeatureCard = memo(({ title, description, Icon }) => (
  <div 
    className="bg-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100" 
    role="region" 
    aria-labelledby={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-blue-100 rounded-lg">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h2 
        id={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`} 
        className="text-2xl font-bold"
      >
        {title}
      </h2>
    </div>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
));

FeatureCard.displayName = 'FeatureCard';

// Stats Counter Component
const StatsCounter = memo(({ value, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-white mb-2">
        {count.toLocaleString()}+
      </div>
      <div className="text-blue-100">{label}</div>
    </div>
  );
});

StatsCounter.displayName = 'StatsCounter';

const HomePage = () => {
  const features = [
    {
      title: "Simulate Fights",
      description: "Experience epic battles between characters from different universes. Our advanced simulation engine considers powers, abilities, and combat styles.",
      Icon: Swords
    },
    {
      title: "Track Stats",
      description: "Comprehensive statistics tracking for every character, including win rates, favorite moves, and historical performance data.",
      Icon: ChartBar
    },
    {
      title: "Analyze Battles",
      description: "Deep dive into fight analytics with round-by-round breakdowns, damage reports, and strategic insights.",
      Icon: BarChart3
    }
  ];

  const stats = [
    { value: 1000, label: "Fights Simulated" },
    { value: 150, label: "Characters" },
    { value: 500, label: "Active Users" },
    { value: 50, label: "Universes" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow" role="main">
        {/* Hero Section */}
        <section 
          className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24 overflow-hidden" 
          aria-label="Hero Section"
        >
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 -top-20 -left-20 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute w-96 h-96 -bottom-20 -right-20 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-6xl font-bold mb-6 animate-fade-in">
                Epic Battle Simulator
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed max-w-2xl mx-auto">
                Create legendary matchups between your favorite characters.
                Witness epic battles unfold with stunning visualizations and detailed analytics.
              </p>
              <div className="flex justify-center gap-4">
                <Link 
                  to="/fights" 
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
                  aria-label="Start a Fight Simulation"
                >
                  Start Fighting <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  to="/characters" 
                  className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
                  aria-label="Browse Characters"
                >
                  Browse Characters
                </Link>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatsCounter 
                  key={index}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section 
          className="container mx-auto py-20 px-4" 
          aria-label="Features"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Experience the Ultimate Battle Simulator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                {...feature}
              />
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section 
          className="bg-gray-900 text-white py-16" 
          aria-label="Call to Action"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">
              Ready to Start Your Battle Journey?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/fights" 
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                aria-label="Create Your First Fight"
              >
                <Swords className="h-5 w-5" />
                Create Fight
              </Link>
              <Link 
                to="/leaderboards" 
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-all transform hover:scale-105"
                aria-label="View Leaderboards"
              >
                <Trophy className="h-5 w-5" />
                Leaderboards
              </Link>
              <Link 
                to="/characters" 
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105"
                aria-label="Browse Characters"
              >
                <Users className="h-5 w-5" />
                Characters
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
};

StatsCounter.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default HomePage;
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Swords, 
  Trophy, 
  Users, 
  BarChart,
  Info,
  ExternalLink
} from 'lucide-react';

const features = [
  {
    icon: Swords,
    title: "Real-Time Battles",
    description: "Experience dynamic fight simulations with detailed animations and move-by-move breakdowns."
  },
  {
    icon: Trophy,
    title: "Character Stats",
    description: "Compare character abilities, strengths, and weaknesses across different universes."
  },
  {
    icon: Users,
    title: "Multiple Universes",
    description: "Choose fighters from various comic universes including Marvel, DC, and more."
  },
  {
    icon: BarChart,
    title: "Battle Analytics",
    description: "Track performance statistics and analyze fight outcomes with detailed metrics."
  }
];

const AboutPage = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <Helmet>
        <title>About - Fight Simulation App</title>
        <meta name="description" content="Learn about the Fight Simulation App and its features" />
      </Helmet>
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <motion.section 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-block p-2 bg-blue-500 rounded-full mb-4">
              <Info className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Fight Simulation App
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience epic battles between your favorite comic book characters
              with real-time simulations and detailed analytics.
            </p>
          </motion.section>

          {/* Features Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </section>

          {/* Banner Image */}
          {!imageError ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-xl overflow-hidden mb-16 aspect-video"
            >
              <img 
                src="/images/fight-banner.jpg"
                alt="Epic battle scene"
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            </motion.div>
          ) : (
            <div className="bg-gray-800 rounded-xl p-12 text-center mb-16">
              <Swords className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Battle scene visualization</p>
            </div>
          )}

          {/* Description Section */}
          <section className="bg-gray-800 rounded-xl p-8 mb-16">
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-lg text-gray-300">
                Our app provides a unique platform to simulate battles between characters
                from various comic universes. Using sophisticated algorithms, we analyze
                character stats, abilities, and fighting styles to create realistic and
                exciting battle scenarios.
              </p>
              <p className="text-lg text-gray-300">
                Every fight is meticulously simulated with detailed move-by-move breakdowns,
                allowing you to understand exactly how the battle unfolded. Track performance
                statistics, analyze matchups, and discover which characters truly reign supreme.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link 
                to="/fights"
                className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <Swords className="w-5 h-5" />
                Start Fighting
              </Link>
              <Link
                to="/characters"
                className="px-8 py-4 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" />
                Browse Characters
              </Link>
              <a
                href="https://github.com/yourusername/fight-simulation-app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gray-700 text-white rounded-xl font-bold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                View Source
              </a>
            </div>
          </section>
        </div>
      </motion.main>
    </>
  );
};

export default AboutPage;
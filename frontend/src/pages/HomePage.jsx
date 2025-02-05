import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FeatureCard = ({ title, description }) => (
  <div className="bg-gray-100 rounded-lg p-6 text-center transform transition-transform hover:scale-105">
    <h2 className="text-2xl font-bold mb-3">{title}</h2>
    <p className="text-gray-700">{description}</p>
  </div>
);

const HomePage = () => {
  const features = [
    {
      title: "Simulate Fights",
      description: "Pick your favorite characters from different universes and pit them against each other to see who wins based on their stats and abilities."
    },
    {
      title: "Track Stats",
      description: "View each character's win/loss record and other stats after every fight. Keep an eye on the leaderboard to see who dominates."
    },
    {
      title: "Analyze Battles",
      description: "Get a detailed breakdown of each fight, round by round, and see how different stats affect the outcome of the battle."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Welcome to the Fight Simulation App
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience epic battles between your favorite comic book characters.
              Select characters, simulate a fight, and see who comes out on top!
            </p>
            <Link 
              to="/fights" 
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-100 transition-colors"
            >
              Start a Fight
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        {/* Additional Navigation */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto text-center">
            <div className="space-x-6">
              <Link 
                to="/characters" 
                className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                View Characters
              </Link>
              <Link 
                to="/leaderboards" 
                className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Leaderboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
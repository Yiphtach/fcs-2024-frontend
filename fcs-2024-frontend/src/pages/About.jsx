import { Link } from 'react-router-dom';
import Header from './Header'; // Import the Header component we created earlier
import Footer from './Footer'; // Import the Footer component we created earlier
import { Helmet } from 'react-helmet-async';

// You might want to replace this with an actual image or use a placeholder
const FightBannerImage = '/images/fight-banner.jpg';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About - Fight Simulation App</title>
      </Helmet>
      
      <Header title="Fight Simulation App" />
      
      <main className="p-5">
        <section className="about max-w-[800px] mx-auto text-center py-10 px-5">
          <h1 className="text-3xl md:text-4xl mb-5 text-gray-800 font-bold">About This App</h1>
          
          <p className="text-base md:text-lg mb-7 text-gray-600 leading-relaxed">
            The Fight Simulation App allows you to experience exciting battles between your favorite comic book characters 
            from various universes. Using their unique stats and abilities, you can pit them against each other and see 
            who comes out on top. Every fight is simulated in real-time, and detailed statistics are generated after each match.
          </p>

          <p className="text-base md:text-lg mb-7 text-gray-600 leading-relaxed">
            Our platform provides a leaderboard to track the performance of different characters, so you can see who reigns 
            supreme based on their win/loss record. Dive into the world of comic battles and analyze every move, stat, and 
            ability to understand how each victory or defeat was achieved.
          </p>

          {/* Image with fallback for cases where image might not load */}
          <img 
            src={FightBannerImage} 
            alt="Comic Battle" 
            className="w-full h-auto mb-8 rounded-lg shadow-md object-cover"
            onError={(e) => {
              e.target.src = '/path/to/fallback/image.jpg'; // Add a fallback image path
            }}
          />

          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-green-500 text-white text-lg rounded-md 
                       transition-all duration-300 hover:bg-green-600 hover:shadow-lg"
          >
            Back to Home
          </Link>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default AboutPage;
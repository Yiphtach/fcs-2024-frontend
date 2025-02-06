import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Progress } from '@/components/ui/';

const FightResult = ({ char1, char2, fightResult }) => {
  const [char1Health, setChar1Health] = useState(fightResult.initialChar1Health);
  const [char2Health, setChar2Health] = useState(fightResult.initialChar2Health);
  const [fightLog, setFightLog] = useState([]);

  // Helper function to extract damage from log
  const extractDamage = (log) => {
    const damageMatch = log.match(/causing (\d+) damage/);
    return damageMatch ? parseInt(damageMatch[1], 10) : 0;
  };

  // Simulate fight log progression
  useEffect(() => {
    const logs = [...fightResult.log];
    const updatedLog = [];

    const logInterval = setInterval(() => {
      if (logs.length > 0) {
        const currentLog = logs.shift();
        updatedLog.push(currentLog);
        setFightLog([...updatedLog]);

        // Update health bars
        if (currentLog.includes(`${char1.name} attacks`)) {
          setChar2Health(prev => Math.max(0, prev - extractDamage(currentLog)));
        } else if (currentLog.includes(`${char2.name} attacks`)) {
          setChar1Health(prev => Math.max(0, prev - extractDamage(currentLog)));
        }
      } else {
        clearInterval(logInterval);
      }
    }, 1000);

    return () => clearInterval(logInterval);
  }, [char1.name, char2.name, fightResult.log]);

  const handleFightAgain = () => {
    window.location.href = '/fights';
  };

  return (
    <div className="fight-result-container">
      <main className="p-5">
        <section className="text-center mb-8">
          <h1 className="text-4xl mb-5">Fight Result</h1>
          <p className="text-xl mb-8">
            <strong>{char1.name}</strong> vs. <strong>{char2.name}</strong>
          </p>

          {/* Health Bars */}
          <div className="flex justify-around mb-5">
            <div className="text-center">
              <strong>{char1.name}</strong>
              <Progress 
                value={char1Health} 
                max={100} 
                className="w-[100px] h-5 mx-auto" 
              />
              <span>{char1Health}/100</span>
            </div>
            <div className="text-center">
              <strong>{char2.name}</strong>
              <Progress 
                value={char2Health} 
                max={100} 
                className="w-[100px] h-5 mx-auto" 
              />
              <span>{char2Health}/100</span>
            </div>
          </div>

          {/* Fight Log */}
          <ul className="list-none p-0 mb-8">
            {fightLog.map((log, index) => (
              <li 
                key={index} 
                className="bg-gray-100 p-3 mb-2 rounded-md"
              >
                {log}
              </li>
            ))}
          </ul>

          <Button 
            onClick={handleFightAgain} 
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Simulate Another Fight
          </Button>
        </section>
      </main>
    </div>
  );
};
FightResult.propTypes = {
  char1: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  char2: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  fightResult: PropTypes.shape({
    log: PropTypes.arrayOf(PropTypes.string).isRequired,
    initialChar1Health: PropTypes.number.isRequired,
    initialChar2Health: PropTypes.number.isRequired
  }).isRequired
};


export default FightResult;
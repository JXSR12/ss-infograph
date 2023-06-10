// App.tsx

import React from 'react';
import './App.css';

type PlanetProps = {
  name: string;
  orbitalPeriod: number; 
  index: number; 
};

// Planet component in App.tsx

const Planet: React.FC<PlanetProps> = ({name, orbitalPeriod, index}) => {
  const animationDuration = `${orbitalPeriod}s`;
  const planetClassName = `${name} planet`;
  const orbitSize = `${(index+1)*14}vmin`;

  return (
    <div className="orbit" style={{width: orbitSize, height: orbitSize, animation: `spin ${animationDuration} linear infinite`}}>
      <div className="planet-holder">
        <div className={planetClassName} />
      </div>
    </div>
  );
};



const App = () => {
  const earthOrbitalPeriodInSeconds = 10; // Earth year in seconds
  const planets = [
    {name: 'mercury', orbitalPeriod: (88/365.25) * earthOrbitalPeriodInSeconds},
    {name: 'venus', orbitalPeriod: (224.7/365.25) * earthOrbitalPeriodInSeconds},
    {name: 'earth', orbitalPeriod: earthOrbitalPeriodInSeconds},
    {name: 'mars', orbitalPeriod: (687/365.25) * earthOrbitalPeriodInSeconds},
    {name: 'jupiter', orbitalPeriod: (4332.59/365.25) * earthOrbitalPeriodInSeconds},
    {name: 'saturn', orbitalPeriod: (10759.22/365.25) * earthOrbitalPeriodInSeconds},
    {name: 'uranus', orbitalPeriod: (30688.5/365.25) * earthOrbitalPeriodInSeconds},
    {name: 'neptune', orbitalPeriod: (60182/365.25) * earthOrbitalPeriodInSeconds}
  ];

  return (
    <div className="solar-system">
      <div className="sun" />
      {planets.map((planet, index) => 
        <Planet key={planet.name} name={planet.name} orbitalPeriod={planet.orbitalPeriod} index={index} />
      )}
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import './App.css';

type PlanetProps = {
  name: string;
  orbitalPeriod: number;
  index: number;
};

const Planet: React.FC<PlanetProps> = ({ name, orbitalPeriod, index }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const animationDuration = `${orbitalPeriod}s`;
  const zIndexClassName = `zi-${20 - index}`;
  const planetClassName = `${name} planet`;
  const orbitSize = `${(index + 1) * 12}vmin`;

  const handlePlanetClick = () => {
    setShowSidebar(true);
    console.log("CLICK")
  };

  return (
    <div
      className={`${zIndexClassName} orbit`}
      onClick={handlePlanetClick} 
      style={{

        width: orbitSize,
        height: orbitSize,
        animation: `spin ${animationDuration} linear infinite`
      }}
    >
      <div className="planet-holder">
        <div className={planetClassName}/>
      </div>
      {showSidebar && <Sidebar name={name} />}
    </div>
  );
};

type SidebarProps = {
  name: string;
};

const Sidebar: React.FC<SidebarProps> = ({ name }) => {
  return (
    <div className="sidebar">
      <h2>{name}</h2>
      {/* Additional planet information */}
    </div>
  );
};

const App = () => {
  const earthOrbitalPeriodInSeconds = 10; // Earth year in seconds
  const planets = [
    { name: 'mercury', orbitalPeriod: (88 / 365.25) * earthOrbitalPeriodInSeconds },
    { name: 'venus', orbitalPeriod: (224.7 / 365.25) * earthOrbitalPeriodInSeconds },
    { name: 'earth', orbitalPeriod: earthOrbitalPeriodInSeconds },
    { name: 'mars', orbitalPeriod: (687 / 365.25) * earthOrbitalPeriodInSeconds },
    { name: 'jupiter', orbitalPeriod: (4332.59 / 365.25) * earthOrbitalPeriodInSeconds },
    { name: 'saturn', orbitalPeriod: (10759.22 / 365.25) * earthOrbitalPeriodInSeconds },
    { name: 'uranus', orbitalPeriod: (30688.5 / 365.25) * earthOrbitalPeriodInSeconds },
    { name: 'neptune', orbitalPeriod: (60182 / 365.25) * earthOrbitalPeriodInSeconds }
  ];

  return (
    <div className="solar-system">
      <div className="sun" />
      {planets.map((planet, index) => (
        <Planet key={planet.name} name={planet.name} orbitalPeriod={planet.orbitalPeriod} index={index} />
      ))}
      <video className="background-video" autoPlay loop muted>
        <source src="/assets/background.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default App;

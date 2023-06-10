// App.tsx

import React, { useState } from 'react';
import './App.css';

type PlanetProps = {
  name: string;
  orbitalPeriod: number;
  index: number;
  onClick: () => void;
};

const Planet: React.FC<PlanetProps> = ({ name, orbitalPeriod, index, onClick }) => {
  const animationDuration = `${orbitalPeriod}s`;
  const zIndexClassName = `zi-${20 - index}`;
  const planetClassName = `${name} planet`;
  const orbitSize = `${(index + 1) * 12}vmin`;

  return (
    <div
      className={`${zIndexClassName} orbit`}
      onClick={onClick} 
      style={{
        width: orbitSize,
        height: orbitSize,
        animation: `spin ${animationDuration} linear infinite`
      }}
    >
      <div className="planet-holder">
        <div className={planetClassName} />
      </div>
    </div>
  );
};

type SidebarProps = {
  name: string;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ name, onClose }) => {
  return (
    <div className="sidebar slide-in">
      <h2>{name}</h2>
      {/* Additional planet information */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
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

  const handlePlanetClick = (planetName: string) => {
    setSelectedPlanet(planetName);
    setShowSidebar(true);
    document.body.classList.add('sidebar-open');
  };
  
  const handleCloseSidebar = () => {
    setShowSidebar(false);
    document.body.classList.remove('sidebar-open');
  };  

  return (
    <div className="solar-system">
      <div className="sun" />
      <video className="background-video" autoPlay loop muted>
        <source src="/assets/background.mp4" type="video/mp4" />
      </video>
      <audio autoPlay loop>
        <source src="/assets/music (1).mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      {planets.map((planet, index) => (
        <Planet 
          key={planet.name} 
          name={planet.name} 
          orbitalPeriod={planet.orbitalPeriod} 
          index={index} 
          onClick={() => handlePlanetClick(planet.name)} 
        />
      ))}
      {showSidebar && selectedPlanet && <Sidebar name={selectedPlanet} onClose={handleCloseSidebar} />}
    </div>
  );
};

export default App;

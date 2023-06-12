import React, { useState } from 'react';
import './App.css';
import planetDetails from './planetDetails.json';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
  const orbitSize = `${(index + 1) * 11}vmin`;
  const belts = [
    { orbitSize: `${parseInt(orbitSize) - 1.5}vmin` },
    { orbitSize: orbitSize },
    { orbitSize: `${parseInt(orbitSize) + 1.5}vmin` },
  ];
  if (name === "the asteroid belt") {
    return (
      <div className={zIndexClassName} id="asteroidbelt"
        style={{
          width: `${parseInt(orbitSize) + 2}vmin`,
          height: `${parseInt(orbitSize) + 2}vmin`
        }}
      >
        {belts.map((belt, index) => (
          <div
            key={index}
            className="orbit-dot"
            onClick={onClick} 
            style={{
              width: belt.orbitSize,
              height: belt.orbitSize
            }}
          >
          </div>
        ))}
      </div>
    )
  }

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
  const [openSection, setOpenSection] = useState("Details");
  const selectedPlanet = planetDetails.find((i) => i.name === name);

  if (!selectedPlanet) {
    return null; // Return null if the planet name is not found
  }

  const hasMoons = parseInt(selectedPlanet.nat_sat) > 0;

  const handleAccordionClick = (section : any) => {
    setOpenSection(openSection === section ? "" : section);
  };

  return (
    <div className="sidebar slide-in">
      <button onClick={onClose}><b>Close Information Board</b></button>
      <br/>
      <h2 id="h2sidebar">
        {name
          .split(" ")
          .map((word) => word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase())
          .join(" ")}
      </h2>
      <div className="sidebar-container">
        <img
          src={selectedPlanet.filepath}
          alt="alternative_text"
          width={selectedPlanet.width || 480}
          height={selectedPlanet.height || 360}
        />
      </div>
      <p className="justified">{selectedPlanet.description}</p>
      <div>
        <button onClick={() => handleAccordionClick("Details")}><b>{openSection === "Details" ? "Hide Details" : "Show Details"}</b></button>
        {openSection === "Details" && (
          <div className="scrollable-table">
            <table>
              {selectedPlanet && selectedPlanet.name === "the asteroid belt" ? (
                <>
                  <tr>
                    <td>Types of Asteroid</td>
                    <td>{selectedPlanet.types?.map((type, index) => (
                      <p key={index} className="justified">{type}</p>
                    ))}</td>
                  </tr>
                  <tr>
                    <td>Notable Asteroids</td>
                    <td className="justified">{selectedPlanet.notable}</td>
                  </tr>
                  <tr>
                    <td>Composition</td>
                    <td className="justified">{selectedPlanet.composition}</td>
                  </tr>
                </>
              ) : (
                <>
                  <tr>
                    <td>Surface Area</td>
                    <td>{selectedPlanet.surface_area}</td>
                  </tr>
                  <tr>
                    <td>Diameter</td>
                    <td>{selectedPlanet.diameter}</td>
                  </tr>
                  <tr>
                    <td>Mass</td>
                    <td>{selectedPlanet.mass}</td>
                  </tr>
                  <tr>
                    <td>Volume</td>
                    <td>{selectedPlanet.volume}</td>
                  </tr>
                  <tr>
                    <td>Revolution period</td>
                    <td>{selectedPlanet.revolution}</td>
                  </tr>
                  <tr>
                    <td>Rotation period</td>
                    <td>{selectedPlanet.rotation}</td>
                  </tr>
                  <tr>
                    <td>Natural satellites</td>
                    <td>{selectedPlanet.nat_sat}</td>
                  </tr>
                  <tr>
                    <td>Artificial satellites</td>
                    <td>{selectedPlanet.art_sat}</td>
                  </tr>
                  <tr>
                    <td>Composition</td>
                    <td>{selectedPlanet.composition}</td>
                  </tr>
                  <tr>
                    <td>Atmosphere</td>
                    <td>{selectedPlanet.atmosphere}</td>
                  </tr>
                  <tr>
                    <td>Average Surface Temperature</td>
                    <td>{selectedPlanet.surface_temp}</td>
                  </tr>
                  <tr>
                    <td>Distance from the sun</td>
                    <td>{selectedPlanet.sun_dist}</td>
                  </tr>
                </>
              )}
            </table>
          </div>
        )}
        {hasMoons && (
          <>
            <button onClick={() => handleAccordionClick("Satellites")}>
              <b>{openSection === "Satellites" ? "Hide Notable Satellites" : "Show Notable Satellites"}</b>
            </button>
            {openSection === "Satellites" && 
            <div>
              {selectedPlanet.notable_moons?.map((moon, index) => (
                <>
                  <h3 className="h3sidebar" key={index}>
                    {moon}
                  </h3>
                  <div className="sidebar-container">
                      <img
                        src={selectedPlanet.moons_file_path[index]}
                        alt={moon}
                        width="auto"
                        height="190"
                      />
                  </div>
                </>
                
              ))}
            </div>
            }
          </>
        )}
        <button onClick={() => handleAccordionClick("Fun Facts")}><b>{openSection === "Fun Facts" ? "Hide Fun Facts" : "Show Fun Facts"}</b></button>
        {openSection === "Fun Facts" && 
          <div>
            <ul className="justified">
              {selectedPlanet.fun_facts?.map((facts, index) => (
                <li key={index} 
                    style={{"--bullet-color": getRandomPastelColor(), "--content": index} as React.CSSProperties}
                    onMouseEnter={() => speak(facts)}>
                  {facts}
                </li>
              ))}
            </ul>
          </div>}
      </div>
    </div>
  );
};

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}


function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 80%)`;
}

const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);
  const earthOrbitalPeriodInSeconds = 10; // Earth year in seconds
  const planets = [
    { name: 'mercury', orbitalPeriod: (88 / 365.25) * earthOrbitalPeriodInSeconds },
    { name: 'venus', orbitalPeriod: (224.7 / 365.25) * earthOrbitalPeriodInSeconds },
    { name: 'earth', orbitalPeriod: earthOrbitalPeriodInSeconds },
    { name: 'mars', orbitalPeriod: (687 / 365.25) * earthOrbitalPeriodInSeconds },
    { name: 'the asteroid belt', orbitalPeriod: 10000},
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
      <div className="sun" onClick={() => handlePlanetClick("sun")}/>
      <video className="background-video" autoPlay loop muted>
        <source src="/assets/fixed_background.mp4" type="video/mp4" />
      </video>
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

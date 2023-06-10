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
  const planetDetails = [
    {
      name: 'sun',
      filepath: 'assets/sun.png',
      description: "AG type main sequence star that provides heat, light, and energy to the solar system",
      surface_area: "Approximately 6.09 × 10^12 km²",
      diameter: "Approximately 1.39 million km",
      mass: "Approximately 1.989 × 10^30 kg",
      volume: "Approximately 1.41 × 10^18 km³",
      age: "Approximately 4.6 billion years",
      revolution: "N/A (The Sun is the center of the solar system, so it doesn't revolve around any celestial body)",
      rotation: "Approximately 24.47 days at the equator, but it varies with latitude",
      nat_sat: "None",
      art_sat: "None",
      composition: "Primarily composed of hydrogen (about 74%) and helium (about 24%), with traces of other elements such as oxygen, carbon, and iron",
      atmosphere: "The Sun has several layers, including the photosphere, chromosphere, and corona, with different temperatures and densities. It emits a continuous stream of charged particles called the solar wind.",
      surface_temp1: "Approximately 5,500 °C (9,932 °F) at the photosphere",
      surface_temp2: "Approximately 15 million °C (27 million °F) at the core",
      sun_dist: "N/A (The Sun is the center of the solar system)",
    },
    {
      name: 'mercury',
      filepath: 'assets/mercury.png',
      description: "Small, rocky planet closest to the Sun",
      surface_area: "74,800,000 km²",
      diameter: "4,879 km",
      mass: "3.3011 × 10^23 kg",
      volume: "6.083 × 10^10 km³",
      age: "4.5 billion years",
      revolution: "88 days",
      rotation: "59 days",
      nat_sat: "None",
      art_sat: "None",
      composition: "Mostly composed of iron and silicate rocks",
      atmosphere: "Very thin and primarily consists of traces of helium, hydrogen, and oxygen",
      surface_temp1: "Approximately 173 °C",
      surface_temp2: "Approximately 427 °C",
      sun_dist: "Approximately 58 million km"
    },
    {
      name: 'venus',
      filepath: 'assets/venus.png',
      description: "Hot and hostile environment with a dense atmosphere",
      surface_area: "460,200,000 km²",
      diameter: "12,104 km",
      mass: "4.8675 × 10^24 kg",
      volume: "9.2843 × 10^11 km³",
      age: "4.5 billion years",
      revolution: "225 days",
      rotation: "243 days",
      nat_sat: "None",
      art_sat: "None",
      composition: "Primarily composed of carbon dioxide with traces of nitrogen and sulfuric acid",
      atmosphere: "Thick atmosphere mainly consisting of carbon dioxide with clouds of sulfuric acid",
      surface_temp1: "Approximately 462 °C",
      surface_temp2: "Approximately 462 °C",
      sun_dist: "Approximately 108 million km"
    },
    {
      name: 'earth',
      filepath: 'assets/earth.png',
      description: "Only known planet to support life",
      surface_area: "510,072,000 km²",
      diameter: "12,742 km",
      mass: "5.97237 × 10^24 kg",
      volume: "1.08321 × 10^12 km³",
      age: "4.5 billion years",
      revolution: "365.25 days",
      rotation: "24 hours",
      nat_sat: "1 (Moon)",
      art_sat: "Various human made satellites",
      composition: "Primarily composed of iron, oxygen, silicon, and magnesium, with a solid crust and molten inner core",
      atmosphere: "Nitrogen (78%), oxygen (21%), with traces of other gases",
      surface_temp1: "Varies across different regions, averaging around 15 °C",
      surface_temp2: "Varies across different regions, averaging around 15 °C",
      sun_dist: "Approximately 150 million km"
    },
    {
      name: 'mars',
      filepath: 'assets/mars.png',
      description: "Cold, desertlike planet with evidence of liquid water in the past",
      surface_area: "144,798,500 km²",
      diameter: "6,779 km",
      mass: "6.4171 × 10^23 kg",
      volume: "1.6318 × 10^11 km³",
      age: "4.6 billion years",
      revolution: "687 days",
      rotation: "24.6 hours",
      nat_sat: "2 (Phobos and Deimos)",
      art_sat: "Various human made satellites",
      composition: "Primarily composed of iron, magnesium, silicon, and oxygen",
      atmosphere: "Thin atmosphere mainly consisting of carbon dioxide with traces of nitrogen and argon",
      surface_temp1: "Approximately 143 °C",
      surface_temp2: "Approximately 20 °C",
      sun_dist: "Approximately 228 million km"
    },
    {
      name: 'jupiter',
      filepath: 'assets/jupiter.png',
      description: "Largest planet in the solar system with distinct bands and a turbulent atmosphere",
      surface_area: "61,418,740,000 km²",
      diameter: "139,820 km",
      mass: "1.898 × 10^27 kg",
      volume: "1.43128 × 10^15 km³",
      age: "4.6 billion years",
      revolution: "11.9 years",
      rotation: "9.9 hours",
      nat_sat: "79 confirmed moons, including Io, Europa, Ganymede, and Callisto",
      art_sat: "None",
      composition: "Mostly composed of hydrogen and helium with traces of other compounds",
      atmosphere: "Thick atmosphere consisting of hydrogen, helium, methane, ammonia, and other compounds",
      surface_temp1: "Approximately 145 °C",
      surface_temp2: "Approximately 145 °C",
      sun_dist: "Approximately 778 million km"
    },
    {
      name: 'saturn',
      filepath: 'assets/saturn.png',
      description: "Known for its prominent ring system and numerous moons",
      surface_area: "42,612,140,000 km²",
      diameter: "116,460 km",
      mass: "5.683 × 10^26 kg",
      volume: "8.2713 × 10^14 km³",
      age: "4.6 billion years",
      revolution: "29.5 years",
      rotation: "10.7 hours",
      nat_sat: "82 confirmed moons, including Titan, Enceladus, and Mimas",
      art_sat: "None",
      composition: "Mostly composed of hydrogen and helium with traces of other compounds",
      atmosphere: "Thick atmosphere consisting of hydrogen, helium, methane, and other compounds",
      surface_temp1: "Approximately 178 °C",
      surface_temp2: "Approximately 178 °C",
      sun_dist: "Approximately 1.4 billion km"
    },
    {
      name: 'uranus',
      filepath: 'assets/uranus.png',
      description: "Bluegreen color due to methane in its atmosphere and rotates on its side",
      surface_area: "8,083,079,690 km²",
      diameter: "50,724 km",
      mass: "8.681 × 10^25 kg",
      volume: "6.833 × 10^13 km³",
      age: "4.6 billion years",
      revolution: "84 years",
      rotation: "17.2 hours",
      nat_sat: "27 confirmed moons, including Miranda, Ariel, Umbriel, Titania, and Oberon",
      art_sat: "None",
      composition: "Mostly composed of hydrogen and helium with traces of methane",
      atmosphere: "Thin atmosphere mainly consisting of hydrogen, helium, and methane",
      surface_temp1: "Approximately 216 °C",
      surface_temp2: "Approximately 216 °C",
      sun_dist: "Approximately 2.9 billion km"
    },
    {
      name: 'neptune',
      filepath: 'assets/neptune.png',
      description: "Known for its deep blue color and strong winds",
      surface_area: "7,618,272,763 km²",
      diameter: "49,244 km",
      mass: "1.024 ×10^26 kg",
      volume: "6.254 × 10^13 km³",
      age: "4.6 billion years",
      revolution: "165 years",
      rotation: "16.1 hours",
      nat_sat: "14 confirmed moons, including Triton and Nereid",
      art_sat: "None",
      composition: "Mostly composed of hydrogen and helium with traces of methane",
      atmosphere: "Thick atmosphere consisting of hydrogen, helium, and methane",
      surface_temp1: "Approximately 214 °C",
      surface_temp2: "Approximately 214 °C",
      sun_dist: "Approximately 4.5 billion km"
    }
  ]
  const selectedPlanet = planetDetails.find((i) => i.name === name);
  if (!selectedPlanet) {
    return null; // Return null if the planet name is not found
  }
  return (
    <div className="sidebar slide-in">
      <h2 id="h2sidebar">{name.substring(0,1).toUpperCase() + name.substring(1).toLowerCase()}</h2>
      <div className="sidebar-container">
        <img src={selectedPlanet.filepath} alt="alternative_text" width="480" height="360"/>
      </div>
      <p>{selectedPlanet.description}</p>
      <table>
        <tr>
          <td>
            Surface Area
          </td>
          <td>
            {selectedPlanet.surface_area}
          </td>
        </tr>
        <tr>
          <td>
            Diameter
          </td>
          <td>
            {selectedPlanet.diameter}
          </td>
        </tr>
        <tr>
          <td>
            Mass
          </td>
          <td>
            {selectedPlanet.mass}
          </td>
        </tr>
        <tr>
          <td>
            Volume
          </td>
          <td>
            {selectedPlanet.volume}
          </td>
        </tr>
        <tr>
          <td>
            Revolution period
          </td>
          <td>
            {selectedPlanet.revolution}
          </td>
        </tr>
        <tr>
          <td>
            Rotation period
          </td>
          <td>
            {selectedPlanet.rotation}
          </td>
        </tr>
        <tr>
          <td>
            Natural satellites
          </td>
          <td>
            {selectedPlanet.nat_sat}
          </td>
        </tr>
        <tr>
          <td>
            Artificial satellites
          </td>
          <td>
            {selectedPlanet.art_sat}
          </td>
        </tr>
        <tr>
          <td>
            Composition
          </td>
          <td>
            {selectedPlanet.composition}
          </td>
        </tr>
        <tr>
          <td>
            Atmosphere
          </td>
          <td>
            {selectedPlanet.atmosphere}
          </td>
        </tr>
        <tr>
          <td>
            Surface temperature (facing away from the sun)
          </td>
          <td>
            {selectedPlanet.surface_temp1}
          </td>
        </tr>
        <tr>
          <td>
            Surface temperature (facing the sun)
          </td>
          <td>
            {selectedPlanet.surface_temp2}
          </td>
        </tr>
        <tr>
          <td>
            Distance from the sun
          </td>
          <td>
            {selectedPlanet.sun_dist}
          </td>
        </tr>
      </table>

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
        <source src="/assets/music.mp3" type="audio/mp3" />
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

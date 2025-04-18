let selectedMarker = null;

const map = L.map("map", {
  minZoom: 2,
  maxZoom: 5,
  maxBounds: [
    [-90, -180],
    [90, 180]
  ]
}).setView([20, 0], 2);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  subdomains: "abcd",
  maxZoom: 5
}).addTo(map);

//three buttons 
const phase1Group = L.layerGroup();
const phase2Group = L.layerGroup();
const phase3Group = L.layerGroup();


// Add event listeners for phase buttons
document.getElementById("phase-1-btn").addEventListener("click", () => {
  map.addLayer(phase1Group);
});
document.getElementById("phase-2-btn").addEventListener("click", () => {
  map.addLayer(phase1Group); // Keep Phase 1 markers visible
  map.addLayer(phase2Group); // Add Phase 2 markers
});
document.getElementById("phase-3-btn").addEventListener("click", () => {
  map.addLayer(phase1Group); // Keep Phase 1 markers visible
  map.addLayer(phase2Group); // Keep Phase 2 markers visible
  map.addLayer(phase3Group); // Add Phase 3 markers
});

// Initially, show only Phase 1 markers
map.addLayer(phase1Group);




const countries = [
  // Phase 1
  {
    name: "Italy",
    coordinates: [41.8719, 12.5674],
    details: "Italy was on the winner's side of WW1 but felt betrayed. Mussolini aimed to unite the Mediterranean like the Roman Empire.",
    phase: 1,
    side: "Axis"
  },
  {
    name: "Germany",
    coordinates: [51.1657, 10.4515],
    details: "Germany was wrecked by the Treaty of Versailles. Hitler rose to power with promises to fix everything.",
    phase: 1,
    side: "Axis"
  },
  {
    name: "Japan",
    coordinates: [36.2048, 138.2529],
    details: "Japan's economy was a bust. They expanded aggressively in Korea, China, and Russia.",
    phase: 1,
    side: "Axis"
  },
  {
    name: "Austria",
    coordinates: [47.5162, 14.5501],
    details: "Hitler annexed Austria with no resistance in 1938.",
    phase: 1,
    side: "Axis"
  },
  {
    name: "Czechoslovakia",
    coordinates: [49.8175, 15.4730],
    details: "Hitler invaded despite a treaty with Chamberlain.",
    phase: 1,
    side: "Axis"
  },
  {
    name: "Abyssinia",
    coordinates: [9.145, 40.489673],
    details: "Italy colonized Abyssinia using military superiority.",
    phase: 1,
    side: "Axis"
  },
  {
    name: "Northern China",
    coordinates: [39.9042, 116.4074],
    details: "Japan invaded Northern China, including Nanking.",
    phase: 1,
    side: "Axis"
  },
  {
    name: "Poland",
    coordinates: [51.9194, 19.1451],
    details: "Hitler and Stalin split Poland between them.",
    phase: 1,
    side: "Allies"
  },

  // Phase 2
  {
    name: "France",
    coordinates: [46.6034, 1.8883],
    details: "Hitler's blitzkrieg tactics overwhelmed France.",
    phase: 1,
    side: "Allies"
  },
  {
    name: "Norway",
    coordinates: [60.4720, 8.4689],
    details: "Germany captured Norway to secure resources.",
    phase: 2,
    side: "Allies"
  },
  {
    name: "UK",
    coordinates: [51.5074, -0.1278],
    details: "The UK's naval and air superiority stopped Germany.",
    phase: 1,
    side: "Allies"
  },
  {
    name: "Finland",
    coordinates: [61.9241, 25.7482],
    details: "Russia's invasion of Finland exposed its weaknesses.",
    phase: 2,
    side: "Axis"
  },
  {
    name: "Hungary",
    coordinates: [47.1625, 19.5033],
    details: "Hungary was forced to join the Axis powers.",
    phase: 2,
    side: "Axis"
  },
  {
    name: "Romania",
    coordinates: [45.9432, 24.9668],
    details: "Romania was forced into the Axis by Germany.",
    phase: 2,
    side: "Axis"
  },
  {
    name: "USA",
    coordinates: [37.0902, -95.7129],
    details: "The USA supported the Allies with supplies.",
    phase: 1,
    side: "Allies"
  },
  {
    name: "Egypt",
    coordinates: [26.8206, 30.8025],
    details: "Egypt was contested by the UK and Italy.",
    phase: 2,
    side: "Allies"
  },
  {
    name: "Greece",
    coordinates: [39.0742, 21.8243],
    details: "Italy and Germany invaded Greece.",
    phase: 2,
    side: "Allies"
  },
  {
    name: "Russia",
    coordinates: [55.7558, 37.6173],
    details: "Germany's army advanced to Moscow using encircling tactics.",
    phase: 2,
    side: "Allies"
  },
  {
    name: "Pearl Harbor",
    coordinates: [21.3069, -157.8583],
    details: "Japan attacked the US naval base at Pearl Harbor.",
    phase: 2,
    side: "Axis"
  },

  // Phase 3
  {
    name: "Southeast Asia Islands",
    coordinates: [10.8231, 106.6297],
    details: "Japan took control of colonized islands.",
    phase: 3,
    side: "Axis"
  },
  {
    name: "Philippines",
    coordinates: [12.8797, 121.7740],
    details: "The Japanese captured the Philippines.",
    phase: 3,
    side: "Allies"
  },
  {
    name: "Caucasus",
    coordinates: [42.6026, 44.0021],
    details: "Germany attacked to capture oil fields.",
    phase: 3,
    side: "Axis"
  },
  {
    name: "Canada",
    coordinates: [56.1304, -106.3468],
    details: "Canada played a major role in the liberation of Europe and provided critical support during D-Day and other campaigns.",
    phase: 3,
    side: "Allies"
  },
  {
    name: "Australia",
    coordinates: [-25.2744, 133.7751],
    details: "Australia supported the Allies and fought in campaigns in the Pacific, North Africa, and Southeast Asia.",
    phase: 3,
    side: "Allies"
  },
  {
    name: "Somalia (Tobruk)",
    coordinates: [9.145, 40.489673],
    details: "Tobruk in Somalia was the site of intense battles between Axis and Allied forces during the North African campaign.",
    phase: 3,
    side: "Allies"
  },
  {
    name: "Middle East",
    coordinates: [29.3759, 47.9774],
    details: "The Middle East saw campaigns like Operation Exporter and was strategically significant for oil supplies.",
    phase: 3,
    side: "Allies"
  },
  {
    name: "Southeast Asia (British Colonies)",
    coordinates: [13.7563, 100.5018], // Coordinates for Bangkok, a key area
    details: "British colonies in Southeast Asia were under threat from Japanese forces and became major battlegrounds.",
    phase: 3,
    side: "Allies"
  },
  {
    name: "East Indies",
    coordinates: [-6.2088, 106.8456], // Coordinates for Jakarta, Indonesia
    details: "The East Indies were occupied by Japan, who exploited the region for resources and as a strategic base.",
    phase: 3,
    side: "Axis"
  },
  {
    name: "Borders of India (Japan)",
    coordinates: [26.2006, 92.9376], // Coordinates for Assam, near Burma border
    details: "Japanese forces pushed toward India from Burma, leading to the critical battles of Kohima and Imphal.",
    phase: 3,
    side: "Axis"
  },
  // Add Korea to Phase 1
{
  name: "Korea",
  coordinates: [37.5665, 126.9780], // Seoul, Korea
  details: "Occupied by Japan since 1910, Korea was a vital part of Japan's imperial ambitions.",
  phase: 1,
  side: "Axis"
},

// Add islands below Japan to Phase 3
{
  name: "Pacific Islands (Guam)",
  coordinates: [13.4443, 144.7937], // Guam
  details: "Captured by Japan during its early Pacific expansion.",
  phase: 3,
  side: "Axis"
},
{
  name: "Wake Island",
  coordinates: [19.2823, 166.6470], // Wake Island
  details: "Wake Island became a strategic base after being captured by Japan.",
  phase: 3,
  side: "Axis"
},
{
  name: "Marshall Islands",
  coordinates: [7.1315, 171.1845], // General location of the Marshall Islands
  details: "Part of Japan's Pacific stronghold, heavily fortified during the war.",
  phase: 3,
  side: "Axis"
},
{
  name: "Mariana Islands",
  coordinates: [15.0979, 145.6739], // Saipan, Northern Mariana Islands
  details: "The Mariana Islands were key to Japan's defense perimeter in the Pacific.",
  phase: 3,
  side: "Axis"
},
{
  name: "Poland",
  coordinates: [51.9194, 19.1451],
  details: "Poland was occupied by Germany and divided with the Soviet Union during Phase 2.",
  phase: 2,
  side: "Axis"
},
{
  name: "France",
  coordinates: [46.6034, 1.8883],
  details: "France was occupied by Germany after the Fall of France in 1940.",
  phase: 2,
  side: "Axis"
},
{
  name: "Libya",
  coordinates: [26.3351, 17.2283],
  details: "Libya was an Italian colony and a key base for Axis forces during the North African campaign.",
  phase: 1,
  side: "Axis"
},
// Ethiopia (captured by Italy)
{
  name: "Ethiopia",
  coordinates: [9.145, 40.489673],
  details: "Ethiopia, also known as Abyssinia, was invaded and occupied by Italy in 1936, before becoming a battleground in Phase 1.",
  phase: 1,
  side: "Axis"
},
// Tunisia (controlled by Vichy France and later Axis-aligned)
{
  name: "Tunisia",
  coordinates: [33.8869, 9.5375],
  details: "Tunisia was under French control but fell under Axis influence following the Fall of France.",
  phase: 2,
  side: "Axis"
},
// Somalia (Italian Somaliland)
{
  name: "Somalia",
  coordinates: [5.1521, 46.1996],
  details: "Italian Somaliland was a key part of Italy's East African Empire.",
  phase: 1,
  side: "Axis"
},
// Algeria (controlled by Vichy France)
{
  name: "Algeria",
  coordinates: [28.0339, 1.6596],
  details: "Algeria, under French control, became a strategic location for Axis operations through Vichy France.",
  phase: 2,
  side: "Axis"
},
{
  name: "French Equatorial Africa",
  coordinates: [1.7771, 15.2310], // Coordinates for Gabon (central point of French Equatorial Africa)
  details: "French Equatorial Africa, including Gabon, Chad, and Congo, was controlled by Vichy France, which was aligned with the Axis powers during Phase 2.",
  phase: 2,
  side: "Axis"
},

// Angola (Neutral but strategically important, Phase 2-3)
{
  name: "Angola",
  coordinates: [-11.2027, 17.8739],
  details: "Angola, a Portuguese colony, was neutral but strategically important due to its position for Axis shipping routes in Phase 2 and 3.",
  phase: 2,
  side: "Axis" // Though neutral, there was Axis influence in terms of espionage and shipping routes
},

// Mozambique (Neutral but strategically important, Phase 2-3)
{
  name: "Mozambique",
  coordinates: [-18.6657, 35.5296],
  details: "Mozambique, also a Portuguese colony, remained neutral during the war but was of strategic interest to both the Axis and the Allies.",
  phase: 2,
  side: "Axis" // Neutral but had some strategic importance for Axis forces
},

// South Africa (Though Allied, important due to Axis activity in the region)
{
  name: "South Africa",
  coordinates: [-30.5595, 22.9375],
  details: "South Africa remained an Allied nation throughout the war, but the Axis attempted to infiltrate through espionage and sabotage during Phase 2 and 3.",
  phase: 2,
  side: "Allies"
},
{
  name: "India",
  coordinates: [20.5937, 78.9629],  // Coordinates for India
  details: "India, under British rule, provided crucial support to the Allies with resources, manpower, and military supplies, including food and firearms.",
  phase: 2,
  side: "Allies"
},

// India in Phase 3 (Continued support to Allies during WWII)
{
  name: "India",
  coordinates: [20.5937, 78.9629],  // Coordinates for India
  details: "India continued to support the Allies, providing essential resources, soldiers, and supplies, contributing significantly to the war effort in the Pacific and the Mediterranean.",
  phase: 3,
  side: "Allies"
}


];




function showCountryDetails(country, marker) {
  const detailsContent = document.getElementById("details-content");
  
  // Display all the details including the new fields
  detailsContent.innerHTML = `
    <b>${country.name}</b><br>
    Alliance: ${country.side}<br>
    Leader: ${country.leader}<br>
    Major Battles: ${country.majorBattles}<br>
    Contributions: ${country.contributions}<br>
    Casualties: ${country.casualties}<br>
    ${country.details}
  `;

  // Clear previous highlight if any
  if (selectedMarker) {
    selectedMarker.setStyle({
      color: selectedMarker.options.originalColor,
      fillOpacity: 0.8,
      weight: 1
    });
  }

  // Highlight the new selected marker
  selectedMarker = marker;
  marker.setStyle({
    color: 'violet',
    fillOpacity: 0,
    weight: 3
  });
}


countries.forEach(country => {
  const color = country.side === "Allies" ? "blue" : "red";

  // Create a marker for the country
  const marker = L.circleMarker(country.coordinates, {
    radius: 8,
    fillColor: color,
    color: color,
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
    originalColor: color // Store the original color for later reset
  });

  // Define the popup content with country details
  const popupContent = `
    <b>${country.name}</b><br>
    <strong>Alliance:</strong> ${country.side}<br>
    <p>${country.details}</p>
  `;

  // Bind the popup to the marker
  marker.bindPopup(popupContent);

  // Add tooltip to show brief information on hover
  marker.bindTooltip(`<b>${country.name}</b><br>Alliance: ${country.side}`);

  // Add pan-to animation and open popup on marker click
  marker.on("click", () => {
    map.panTo([
      country.coordinates[0] + 5, // Slightly offset latitude
      country.coordinates[1]
    ]);
    marker.openPopup(); // Open the popup with details
  });

  // Add the marker to the appropriate phase group
  if (country.phase === 1) {
    phase1Group.addLayer(marker);
  } else if (country.phase === 2) {
    phase2Group.addLayer(marker);
  } else if (country.phase === 3) {
    phase3Group.addLayer(marker);
  }
});




// Function to toggle between map and timeline sections
function showSection(section) {
  document.getElementById("map-container").style.display = section === "explore" ? "block" : "none";
  document.getElementById("timeline-container").style.display = section === "timeline" ? "block" : "none";
}

// Event listeners for sidebar buttons
document.getElementById("explore-btn").addEventListener("click", () => showSection("explore"));
document.getElementById("timeline-btn").addEventListener("click", () => showSection("timeline"));

// Optional: Reset button to re-center map
document.getElementById("reset-map-btn").addEventListener("click", () => {
  map.setView([20, 0], 2); // Reset map to initial view
  
  // Close all open popups
  map.eachLayer((layer) => {
    if (layer instanceof L.Popup) {
      map.closePopup(layer);
    }
  });
});


// Initially display the Explore section
showSection("explore");

const timelineEvents = document.querySelectorAll('.timeline-event');

// JavaScript for scroll detection
window.addEventListener('scroll', () => {
  timelineEvents.forEach(event => {
    const eventTop = event.getBoundingClientRect().top;
    const eventBottom = event.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    if (eventTop < windowHeight * 0.8 && eventBottom > 0) {
      // Add the class to trigger the animation when in view
      event.classList.add('show');
    } else {
      // Remove the class when out of view to allow re-triggering
      event.classList.remove('show');
    }
  });
});

document.querySelectorAll('.timeline-image').forEach(image => {
  image.addEventListener('click', () => {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click', () => {
      document.body.removeChild(lightbox);
    });
  });
});

const facts = [
  "More than 70 million people served in WWII across various armies.",
  "The D-Day invasion was the largest amphibious military operation ever.",
  "The Battle of Stalingrad was one of the deadliest battles in history.",
  "Germany had plans to invade the United Kingdom in Operation Sea Lion.",
  "The US dropped over 2 billion propaganda leaflets on Japan.",
  "The last Japanese soldier finally surrendered in 1974.",
  "An astonishing number of soldiers died during pilot training.",
  "WWII had bizarre weapons, such as the German cannon that could shoot across the sea.",
  "Poland had a bear that served in the military.",
  "Gandhi tried to send a message of peace to Hitler.",
  "World War II didn’t start for everyone in 1939. While much of Europe saw the war begin with the invasion of Poland, the U.S. didn’t enter until 1941.",
  "The Japanese attacked Pearl Harbor on a Sunday because they believed Americans would be less alert. Commander Mitsuo Fuchida called out, 'Tora! Tora! Tora!' to indicate a successful attack.",
  "One Soldier vs. One Hundred: American soldier John R. McKinney single-handedly fought off 100 Japanese soldiers during the campaign to liberate the Philippines, earning a Medal of Honor.",
  "Hitler’s nephew, William Patrick Hitler, was British. Born in Liverpool, he later moved to the U.S. and served in the American Navy, winning decorations for bravery.",
  "You Only Sink Twice: The SMS Wien was sunk twice—once in WWI by an Italian torpedo, then refloated, converted into a hospital ship, and sunk again in WWII.",
  "Japan and Russia never signed a peace treaty. A dispute over the Kuril Islands has prevented a formal peace treaty between the two nations to this day.",
  "Saving Jews through Islam: Si Kaddour Benghabrit of the Grand Mosque of Paris issued certificates to Jews, providing them with an Islamic identity to escape deportation during Nazi occupation.",
  "The USSR was the only major combatant to allow women on the frontlines. Soviet women served as anti-aircraft gunners, pilots, and snipers. Lyudmila Pavlichenko, one of the most decorated, recorded 300 enemy kills.",
  "The Japanese Kamikaze tactic, suggested by Vice-Admiral Onishi, was meant to counter the technological advantage of U.S. forces. About 2,800 kamikaze pilots died, sinking 34 U.S. ships and killing nearly 4,900 sailors.",
  "A German commander was so stressed he abandoned his post and went to a spa—Heinrich Himmler was one of Hitler’s first supporters, becoming the head of the Schutzstaffel (SS) and eventually being put in charge of Army Group Vistula, a group of 500,000 soldiers assigned to protect Berlin.",
  "The United States experimented with the idea of bat bombs. Each bomb contained over a thousand compartments, housing hibernating bats attached to timed incendiary devices.",
  "One of Churchill’s plans remained a secret for over 50 years. At the end of the war, Churchill ordered a plan called ‘Operation Unthinkable’ to explore the feasibility of a surprise attack on Soviet forces stationed in Germany.",
  "Bluffing in Konstanz: Near the Swiss border, the German city of Konstanz played a game of bluff during the war. Instead of enforcing a blackout, they kept their lights on at night, pretending to be a major industrial center to deter Allied bombers.",
  "First German casualty: The first German serviceman killed in WW2 was killed by the Japanese, not by Allied forces. This highlights the complex web of alliances and conflicts during the war.",
  "Nazi plutonium plans: The Nazis came close to developing plutonium, essential for nuclear weapons. They took over a factory in Norway’s Telemark region that produced heavy water, needed for creating plutonium.",
  "Last Japanese holdout: Teruo Nakamura, a Japanese pilot, remained in the Indonesian jungle until 1974, believing the war was still ongoing. He was the last recorded Japanese holdout from WW2.",
  "WW2’s impact on the environment: The war had a significant impact on the environment. The Allies’ use of napalm and defoliants in Southeast Asia led to widespread destruction of forests and ecosystems, while the Germans’ scorched-earth tactics in Eastern Europe caused long-term soil degradation.",
  "Russia and the Red Army were accused of several war crimes, including systematic mass rape (over 2 million German women aged 13-70 were allegedly raped by the Red Army) and genocide.",
  "The war between Japan and Russia ceased with an armistice rather than a peace treaty. Russia was the only nation Japan refused to sign a peace treaty with. Today’s ongoing dispute over the Kuril Islands continues to block a formal signing ceremony even now.",
];


let currentFactIndex = Math.floor(Math.random() * facts.length); // Start with a random fact
const factsList = document.getElementById("facts-list");

// Function to display the current fact
function displayFact() {
  factsList.innerHTML = `<li>${facts[currentFactIndex]}</li>`;
}

// Function to show the next fact in the list
function showNextFact() {
  currentFactIndex = (currentFactIndex + 1) % facts.length; // Loop back to the start if at the end
  displayFact();
}

// Event listener for the "Next Fact" button
document.getElementById("next-fact-btn").addEventListener("click", () => {
  // Reset the automatic cycling timer when "Next Fact" is clicked
  clearInterval(factInterval);
  showNextFact();
  startFactCycle();
});

// Function to start cycling through facts every 5 seconds
function startFactCycle() {
  factInterval = setInterval(showNextFact, 5000);
}

// Initial load: display a random fact and start the cycle
displayFact();
let factInterval = setInterval(showNextFact, 1100);

// Function to show/hide sections based on active page
function showTimeline() {
  document.getElementById("timeline-container").style.display = "block";
  document.getElementById("map-container").style.display = "none";
  document.getElementById("timeline-facts-box").style.display = "block";  // Show facts box in timeline
}

function showExplore() {
  document.getElementById("timeline-container").style.display = "none";
  document.getElementById("map-container").style.display = "block";
  document.getElementById("timeline-facts-box").style.display = "none";  // Hide facts box in explore
}

// Event listeners for navigation buttons
document.getElementById("timeline-btn").addEventListener("click", showTimeline);
document.getElementById("explore-btn").addEventListener("click", showExplore);

// Check the current section on page load and hide facts box if explore is the default
window.addEventListener("load", function() {
  // Set the default section (e.g., explore or timeline)
  const defaultSection = "explore";  // Change to "timeline" if you want timeline as default

  if (defaultSection === "explore") {
    showExplore();
  } else {
    showTimeline();
  }
});

let activeMarkers = [];

// Function to display markers for the selected phase only
function displayMarkers(phase) {
  // Remove all existing markers
  activeMarkers.forEach(marker => map.removeLayer(marker));
  activeMarkers = [];

  // Add markers for countries in the selected phase only
  countries
    .filter(country => country.phase === phase) // Filter only the selected phase
    .forEach(country => {
      const color = country.side === "Allies" ? "blue" : "red";

      const marker = L.circleMarker(country.coordinates, {
        radius: 8,
        fillColor: color,
        color: color,
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`<b>${country.name}</b><br>${country.details}`);

      marker.addTo(map);
      activeMarkers.push(marker);
    });

  // Center the map if there are markers
  if (activeMarkers.length > 0) {
    map.setView(activeMarkers[0].getLatLng(), 4); // Adjust zoom level as needed
  }
}


/// Function to display markers only for the selected phase
function displayMarkersForPhase(phase) {
  // Clear all layers
  map.removeLayer(phase1Group);
  map.removeLayer(phase2Group);
  map.removeLayer(phase3Group);

  // Add layers relevant to the selected phase
  if (phase >= 1) map.addLayer(phase1Group); // Always show Phase 1 for Phase 1 or above
  if (phase >= 2) map.addLayer(phase2Group); // Show Phase 2 for Phase 2 or above
  if (phase >= 3) map.addLayer(phase3Group); // Show Phase 3 for Phase 3
}

// Add event listeners for phase buttons
document.getElementById("phase-1-btn").addEventListener("click", () => displayMarkersForPhase(1));
document.getElementById("phase-2-btn").addEventListener("click", () => displayMarkersForPhase(2));
document.getElementById("phase-3-btn").addEventListener("click", () => displayMarkersForPhase(3));

// Default to Phase 1 on page load
window.addEventListener("load", () => displayMarkersForPhase(1));

// Reset Map Button Functionality
document.getElementById("reset-map-btn").addEventListener("click", () => displayMarkersForPhase(1));

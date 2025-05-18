// Sample airport data
const airportData = {
  terminals: [
    {
      id: "T1",
      name: "Terminal 1",
      gates: [
        { id: "A1", name: "Gate A1", type: "international", status: "active" },
        { id: "A2", name: "Gate A2", type: "international", status: "active" },
        {
          id: "A3",
          name: "Gate A3",
          type: "international",
          status: "maintenance",
        },
        { id: "B1", name: "Gate B1", type: "domestic", status: "active" },
        { id: "B2", name: "Gate B2", type: "domestic", status: "active" },
      ],
    },
    {
      id: "T2",
      name: "Terminal 2",
      gates: [
        { id: "C1", name: "Gate C1", type: "international", status: "active" },
        { id: "C2", name: "Gate C2", type: "international", status: "active" },
        { id: "D1", name: "Gate D1", type: "domestic", status: "maintenance" },
        { id: "D2", name: "Gate D2", type: "domestic", status: "active" },
      ],
    },
  ],
  facilities: [
    { type: "restaurant", location: "T1-A", name: "Sky Café" },
    { type: "shop", location: "T1-B", name: "Travel Essentials" },
    { type: "restroom", location: "T1-A", name: "Restroom A" },
    { type: "restaurant", location: "T2-C", name: "Terminal Bites" },
    { type: "shop", location: "T2-D", name: "Duty Free" },
    { type: "restroom", location: "T2-C", name: "Restroom C" },
  ],
};

// DOM Elements
const airportMap = document.getElementById("airportMap");
const gateFilter = document.getElementById("gateFilter");
const terminalFilter = document.getElementById("terminalFilter");

// Initialize terminal filter
function initializeTerminalFilter() {
  terminalFilter.innerHTML = '<option value="all">All Terminals</option>';
  airportData.terminals.forEach((terminal) => {
    terminalFilter.innerHTML += `
            <option value="${terminal.id}">${terminal.name}</option>
        `;
  });
}

// Render airport map
function renderAirportMap(filterText = "", terminal = "all") {
  airportMap.innerHTML = "";

  airportData.terminals.forEach((terminalData) => {
    if (terminal === "all" || terminal === terminalData.id) {
      const terminalElement = document.createElement("div");
      terminalElement.className = "terminal";

      // Filter gates
      const filteredGates = terminalData.gates.filter(
        (gate) =>
          gate.name.toLowerCase().includes(filterText.toLowerCase()) ||
          gate.type.toLowerCase().includes(filterText.toLowerCase())
      );

      // Get facilities for this terminal
      const terminalFacilities = airportData.facilities.filter((facility) =>
        facility.location.startsWith(terminalData.id)
      );

      terminalElement.innerHTML = `
                <div class="terminal-header">
                    <h3>${terminalData.name}</h3>
                    <div class="terminal-info">
                        <span>${filteredGates.length} Gates</span>
                        <span>${terminalFacilities.length} Facilities</span>
                    </div>
                </div>
                <div class="terminal-layout">
                    <div class="gates-section">
                        ${filteredGates
                          .map(
                            (gate) => `
                            <div class="gate ${gate.status}" data-type="${
                              gate.type
                            }">
                                <div class="gate-header">
                                    <span class="gate-name">${gate.name}</span>
                                    <span class="gate-type">${gate.type}</span>
                                </div>
                                <div class="gate-status">
                                    ${gate.status === "active" ? "🟢" : "🔧"}
                                    ${
                                      gate.status.charAt(0).toUpperCase() +
                                      gate.status.slice(1)
                                    }
                                </div>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                    <div class="facilities-section">
                        ${terminalFacilities
                          .map(
                            (facility) => `
                            <div class="facility" data-type="${facility.type}">
                                <span class="facility-icon">
                                    ${getFacilityIcon(facility.type)}
                                </span>
                                <span class="facility-name">${
                                  facility.name
                                }</span>
                                <span class="facility-location">${
                                  facility.location
                                }</span>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            `;

      airportMap.appendChild(terminalElement);
    }
  });
}

// Get facility icon
function getFacilityIcon(type) {
  switch (type) {
    case "restaurant":
      return "🍽️";
    case "shop":
      return "🛍️";
    case "restroom":
      return "🚻";
    default:
      return "📍";
  }
}

// Add CSS styles
const style = document.createElement("style");
style.textContent = `
    .terminal {
        background: white;
        border-radius: var(--border-radius);
        padding: 1.5rem;
        margin-bottom: 1.5rem;
    }
    
    .terminal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--primary-color);
    }
    
    .terminal-info {
        display: flex;
        gap: 1rem;
        color: #666;
    }
    
    .terminal-layout {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1.5rem;
    }
    
    .gates-section {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    .gate {
        background: #f5f5f5;
        border-radius: var(--border-radius);
        padding: 1rem;
        transition: transform 0.2s;
    }
    
    .gate:hover {
        transform: translateY(-2px);
    }
    
    .gate.maintenance {
        background: #fff3e0;
    }
    
    .gate-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
    }
    
    .gate-name {
        font-weight: bold;
        color: var(--primary-color);
    }
    
    .gate-type {
        color: #666;
        font-size: 0.9rem;
    }
    
    .gate-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
    }
    
    .facilities-section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .facility {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        background: #f5f5f5;
        border-radius: var(--border-radius);
    }
    
    .facility-icon {
        font-size: 1.25rem;
    }
    
    .facility-name {
        flex: 1;
        font-weight: bold;
    }
    
    .facility-location {
        color: #666;
        font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
        .terminal-layout {
            grid-template-columns: 1fr;
        }
    }
`;

document.head.appendChild(style);

// Event Listeners
gateFilter.addEventListener("input", (e) =>
  renderAirportMap(e.target.value, terminalFilter.value)
);
terminalFilter.addEventListener("change", (e) =>
  renderAirportMap(gateFilter.value, e.target.value)
);

// Initialize
initializeTerminalFilter();
renderAirportMap();

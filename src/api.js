// api.js

// Base URL for the NPS API
const baseUrl = "https://developer.nps.gov/api/v1/";

// Generic function to fetch data from the API
async function getJson(endpoint) {
  // Your API key
  const apiKey = "4vqPGot3xB0f7UEuwE8xiNbdwIcvhnUMZlMG59l3";

  // Build full URL
  const url = baseUrl + endpoint;

  // Request options required by the API
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey
    }
  };

  // Fetch data
  const response = await fetch(url, options);
  const data = await response.json();

  // Log response for debugging
  console.log(data);

  return data;
}

// Template function for ONE park
function listTemplate(item) {
  return `
    <li>
      <a href="${item.url}" target="_blank">
        ${item.fullName}
      </a> (${item.states})
    </li>
  `;
}

// Fetch climbing parks and display them
async function renderClimbingList() {
  const endpoint = "activities/parks?q=climbing";
  const listElement = document.getElementById("outputList");

  const data = await getJson(endpoint);

  // IMPORTANT: parks are inside data.data[0].parks
  const parks = data.data[0].parks;

  const listHtml = parks.map(listTemplate).join("");
  listElement.innerHTML = listHtml;
}

// Start the app
renderClimbingList();

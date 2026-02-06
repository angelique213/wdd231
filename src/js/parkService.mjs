const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

// Fetch helper that returns JSON
async function getJson(endpoint) {
  const response = await fetch(baseUrl + endpoint, {
    method: "GET",
    headers: { "X-Api-Key": apiKey },
  });

  if (!response.ok) throw new Error("NPS fetch failed");
  return await response.json();
}

// Gets Glacier National Park data
export async function getParkData() {
  const parkData = await getJson("parks?parkCode=glac");
  return parkData.data[0];
}

// Gets alerts for a park
export async function getParkAlerts(parkCode) {
  const alertsData = await getJson(`alerts?parkCode=${parkCode}`);
  return alertsData.data;
}

// Gets visitor centers for a park
export async function getVisitorCenterData(parkCode) {
  const vcData = await getJson(`visitorcenters?parkCode=${parkCode}`);
  return vcData.data;
}
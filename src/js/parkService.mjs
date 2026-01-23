const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  let data = {};
  const response = await fetch(baseUrl + url, options);

  if (response.ok) {
    data = await response.json();
  } else {
    throw new Error("response not ok");
  }

  return data;
}

export async function getParkData() {
  const parkData = await getJson("parks?parkCode=glac");
  return parkData.data[0];
}

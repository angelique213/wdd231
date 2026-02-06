import "../css/style.css";
import "../css/conditions.css";

import { getParkData, getParkAlerts, getVisitorCenterData } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { alertTemplate, visitorCenterTemplate, activityTemplate } from "./templates.mjs";

// Starts the conditions page
async function init() {
  const parkData = await getParkData();

  setHeaderFooter(parkData);

  const alerts = await getParkAlerts(parkData.parkCode);
  setAlerts(alerts);

  const centers = await getVisitorCenterData(parkData.parkCode);
  setVisitorCenters(centers);

  setActivities(parkData.activities);
}

init();

// Renders the alert list
function setAlerts(alerts) {
  const ul = document.querySelector("#alerts-list");
  ul.innerHTML = "";

  const html = alerts.map(alertTemplate);
  ul.insertAdjacentHTML("beforeend", html.join(""));
}

// Renders the visitor centers inside the details section
function setVisitorCenters(centers) {
  const wrapper = document.querySelector("#visitor-centers");

  if (!centers || centers.length === 0) {
    wrapper.innerHTML = `<p>No visitor centers found.</p>`;
    return;
  }

  wrapper.innerHTML = centers.map(visitorCenterTemplate).join("");
}

// Renders the activities list
function setActivities(activities) {
  const ul = document.querySelector("#activities-list");
  ul.innerHTML = "";

  const html = activities.map(activityTemplate);
  ul.insertAdjacentHTML("beforeend", html.join(""));
}
import "../css/style.css"; 
import "../css/conditions.css"; 

import { getParkData, getParkAlerts, getVisitorCenterData } from "./parkService.mjs"; // imports API functions
import setHeaderFooter from "./setHeaderFooter.mjs"; // updates header, footer, and enables navigation
import { alertTemplate, visitorCenterTemplate, activityTemplate } from "./templates.mjs"; // imports HTML templates

/* ============================= */
/* Start the page */
/* ============================= */

async function init() {
  const parkData = await getParkData(); // fetch park data from NPS API

  setHeaderFooter(parkData); // update header, hero banner, footer, and navigation

  const alerts = await getParkAlerts(parkData.parkCode); // fetch park alerts
  setAlerts(alerts); // render alerts list

  const centers = await getVisitorCenterData(parkData.parkCode); // fetch visitor center data
  setVisitorCenters(centers); // render visitor centers section

  setActivities(parkData.activities); // render activities list from park data
}

init(); // run the page

/* ============================= */
/* Alerts section */
/* ============================= */

function setAlerts(alerts) {
  const ul = document.querySelector("#alerts-list"); // alerts list container
  if (!ul) return;

  ul.innerHTML = ""; // clear existing alerts

  const html = alerts.map(alertTemplate); // convert alerts into HTML
  ul.insertAdjacentHTML("beforeend", html.join("")); // insert alerts into the page
}

/* ============================= */
/* Visitor Centers section */
/* ============================= */

function setVisitorCenters(centers) {
  const wrapper = document.querySelector("#visitor-centers"); // visitor center container
  if (!wrapper) return;

  if (!centers || centers.length === 0) {
    wrapper.innerHTML = `<p>No visitor centers found.</p>`; // message if none exist
    return;
  }

  wrapper.innerHTML = centers.map(visitorCenterTemplate).join(""); // render visitor centers
}

/* ============================= */
/* Activities section */
/* ============================= */

function setActivities(activities) {
  const ul = document.querySelector("#activities-list"); // activities list container
  if (!ul) return;

  ul.innerHTML = ""; // clear existing items

  const html = activities.map(activityTemplate); // convert activities into HTML
  ul.insertAdjacentHTML("beforeend", html.join("")); // insert activities into the page
}
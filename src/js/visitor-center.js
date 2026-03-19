import "../css/style.css";
import "../css/visitor-center.css";

import { getParkData, getParkVisitorCenterDetails } from "./parkService.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import {
  vcTitleTemplate,
  vcInfoTemplate,
  listTemplate,
  vcImageTemplate,
  vcAmenityTemplate,
  vcAddressesListTemplate,
  vcDirectionsTemplate,
  vcContactsTemplate,
  detailsTemplate,
} from "./templates.mjs";

function getParam(param) {
  const search = location.search;
  const params = new URLSearchParams(search);
  return params.get(param);
}

function buildVisitorCenterPage(data) {
  document.querySelector(".vc-name").innerHTML = vcTitleTemplate(data.name);
  document.querySelector(".vc-info").innerHTML = vcInfoTemplate(data);

  const addressesHTML = vcAddressesListTemplate(data.addresses || []);
  const directionsHTML = vcDirectionsTemplate(data.directionsInfo || "");
  const amenitiesHTML = listTemplate(data.amenities || [], vcAmenityTemplate);
  const contactsHTML = vcContactsTemplate(data);

  const detailsHTML = `
    ${detailsTemplate("vcAddresses", "heading-icon_map-pin", "Addresses", addressesHTML)}
    ${detailsTemplate("vcDirections", "directions", "Directions", directionsHTML)}
    ${detailsTemplate("vcAmenities", "heading-icon_info", "Amenities", amenitiesHTML)}
    ${detailsTemplate("vcContact", "phone", "Contact Information", contactsHTML)}
  `;

  document.querySelector(".vc-details-list").innerHTML = detailsHTML;

  const galleryHTML = listTemplate(data.images || [], vcImageTemplate);
  document
    .querySelector(".vc-gallery")
    .insertAdjacentHTML("beforeend", galleryHTML);
}

async function init() {
  const parkData = await getParkData();
  setHeaderFooter(parkData);

  const id = getParam("id");
  const centerDetails = await getParkVisitorCenterDetails(id);

  buildVisitorCenterPage(centerDetails);
}

init();
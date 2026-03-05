import "../css/style.css"; 
import "../css/home.css"; 

import { getParkData } from "./parkService.mjs"; // fetches data from API
import setHeaderFooter from "./setHeaderFooter.mjs"; // fills shared header/footer + enables nav

async function init() {
  const parkData = await getParkData(); // gets park data once

  setHeaderFooter(parkData); // sets header/footer + activates navigation
  setParkIntro(parkData); // fills intro section

  const links = getInfoLinks(parkData.images); // builds 3 info card objects
  setParkInfoLinks(links); // renders the cards
}

init();

function setParkIntro(data) {
  const introEl = document.querySelector(".intro"); // intro container
  introEl.innerHTML = `
    <h1>${data.fullName}</h1>
    <p>${data.description}</p>
  `;
}

function getInfoLinks(images) {
  return [
    {
      name: "Current Conditions &#x203A;",
      link: "conditions.html",
      image: images?.[2]?.url || images?.[0]?.url,
      description:
        "See what conditions to expect in the park before leaving on your trip!",
    },
    {
      name: "Fees and Passes &#x203A;",
      link: "fees.html",
      image: images?.[3]?.url || images?.[1]?.url,
      description: "Learn about the fees and passes that are available.",
    },
    {
      name: "Visitor Centers &#x203A;",
      link: "visitor_centers.html",
      image: images?.[4]?.url || images?.[2]?.url,
      description: "Learn about the visitor centers in the park.",
    },
  ];
}

function mediaCardTemplate(info) {
  return `
    <div class="media-card">
      <a href="${info.link}">
        <img src="${info.image}" alt="${info.name}" class="media-card__img">
        <h3 class="media-card__title">${info.name}</h3>
      </a>
      <p>${info.description}</p>
    </div>
  `;
}

function setParkInfoLinks(cards) {
  const infoEl = document.querySelector(".info"); // cards container
  infoEl.innerHTML = cards.map(mediaCardTemplate).join(""); // inserts cards
}
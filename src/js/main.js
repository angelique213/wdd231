import "../css/style.css";
import "../css/home.css";

import { getParkData } from "./parkService.mjs";

/* -------------------- START APP -------------------- */
/* Loads park data and updates the page */
async function init() {
  const parkData = await getParkData(); // fetch park data from NPS API

  setHeaderInfo(parkData); // update disclaimer link + title + hero banner
  setParkIntro(parkData); // update main heading + intro description

  const parkInfoLinks = getInfoLinks(parkData.images); // build 3 info cards
  setParkInfoLinks(parkInfoLinks); // render the cards into the page

  setFooter(parkData); // update footer contact info
}

init();

/* -------------------- HEADER -------------------- */
/* Updates top disclaimer link, page title, and hero banner */
function setHeaderInfo(data) {
  const disclaimerLink = document.querySelector(".disclaimer > a"); // top disclaimer link
  disclaimerLink.href = data.url; // real NPS site link
  disclaimerLink.textContent = data.fullName; // full park name text

  document.querySelector("head > title").textContent = data.fullName; // browser tab title

  const heroImg = document.querySelector(".hero-banner > img"); // hero banner image
  heroImg.src = data.images?.[0]?.url || heroImg.src; // hero image URL (fallback to existing)
  heroImg.alt = data.images?.[0]?.altText || data.fullName; // hero alt text

  const heroTitle = document.querySelector(".hero-banner__title"); // hero title (park short name)
  heroTitle.textContent = data.name;

  const heroSubtitleSpans = document.querySelectorAll(".hero-banner__subtitle span"); // subtitle lines
  heroSubtitleSpans[0].textContent = data.designation; // ex: National Park
  heroSubtitleSpans[1].textContent = data.states; // ex: MT
}

/* -------------------- INTRO -------------------- */
/* Updates the park intro section */
function setParkIntro(data) {
  const introEl = document.querySelector(".intro"); // intro section container
  introEl.innerHTML = `
    <h1>${data.fullName}</h1>
    <p>${data.description}</p>
  `;
}

/* -------------------- INFO CARDS -------------------- */
/* Creates the three "info" cards data */
function getInfoLinks(images) {
  return [
    {
      name: "Current Conditions &#x203A;",
      link: "conditions.html",
      image: images?.[2]?.url || images?.[0]?.url,
      description: "See what conditions to expect in the park before leaving on your trip!",
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

/* HTML template for one card */
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

/* Renders the cards into the page */
function setParkInfoLinks(cards) {
  const infoEl = document.querySelector(".info"); // cards container
  infoEl.innerHTML = cards.map(mediaCardTemplate).join(""); // render all cards
}

/* -------------------- FOOTER -------------------- */
/* Selects the mailing address object from the list */
function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing");
}

/* Selects the voice phone number from the list */
function getVoicePhone(numbers) {
  const voice = numbers.find((number) => number.type === "Voice");
  return voice ? voice.phoneNumber : "";
}

/* HTML template for footer contact info */
function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts.phoneNumbers);

  return `
    <section class="contact">
      <h3>Contact Info</h3>
      <h4>Mailing Address:</h4>
      <div>
        <p>${mailing.line1}</p>
        <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
      </div>
      <h4>Phone:</h4>
      <p>${voice}</p>
    </section>
  `;
}

/* Renders footer into the page */
function setFooter(data) {
  const footerEl = document.querySelector("#park-footer");
  footerEl.innerHTML = footerTemplate(data);
}

/* ========================================================= */
/* WEEK 6 / NPS PART 5 - NEWLY ADDED CODE (Global Nav Toggle) */
/* ========================================================= */
/* Enables the Menu button to open/close the global navigation */
function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle"); // the Menu/Close button
  const globalNav = document.querySelector(".global-nav"); // the nav panel that slides open

  // If either element is missing, stop (prevents errors)
  if (!menuButton || !globalNav) return;

  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;

    // If click happens on svg/span/div inside the button, climb back up to the button
    if (target.tagName !== "BUTTON") {
      target = target.closest("button");
    }

    // Toggle the menu open/closed class (CSS handles animation)
    globalNav.classList.toggle("show");

    // Update aria-expanded for accessibility (screen readers)
    const isOpen = globalNav.classList.contains("show");
    target.setAttribute("aria-expanded", isOpen);

    // Update aria-label so screen readers announce correct action
    target.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
  });
}

/* Run after the HTML is fully loaded */
document.addEventListener("DOMContentLoaded", () => {
  enableNavigation();
});
import { getParkData } from "./parkService.mjs";

const parkData = getParkData(); // get all park info from the dataset

function setHeaderInfo(data) {
  const disclaimerLink = document.querySelector(".disclaimer > a"); // disclaimer link
  disclaimerLink.href = data.url; // real park website
  disclaimerLink.innerHTML = data.fullName; // full park name text

  document.querySelector("head > title").textContent = data.fullName; // browser tab title

  const heroImg = document.querySelector(".hero-banner > img"); // hero image
  heroImg.src = data.images[0].url;
  heroImg.alt = data.images[0].altText || data.fullName;

  const heroTitle = document.querySelector(".hero-banner__title"); // hero title
  heroTitle.textContent = data.name;

  const heroSubtitleSpans = document.querySelectorAll(".hero-banner__subtitle span"); // hero subtitle
  heroSubtitleSpans[0].textContent = data.designation; // National Park
  heroSubtitleSpans[1].textContent = data.states; // ID, MT, WY
}

function setParkIntro(data) {
  const introEl = document.querySelector(".intro"); // intro section
  introEl.innerHTML = `
    <h1>${data.fullName}</h1>
    <p>${data.description}</p>
  `; // title + description
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
  `; // one card HTML
}

const parkInfoLinks = [
  // the 3 cards we need on the page
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: parkData.images[2].url,
    description: "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: parkData.images[3].url,
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: parkData.images[9].url,
    description: "Learn about the visitor centers in the park."
  }
];

function setParkInfoLinks(data) {
  const infoEl = document.querySelector(".info"); // info section
  infoEl.innerHTML = data.map(mediaCardTemplate).join(""); // build + insert 3 cards
}

function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing"); // pick Mailing address
}

function getVoicePhone(numbers) {
  const voice = numbers.find((number) => number.type === "Voice"); // pick Voice phone
  return voice ? voice.phoneNumber : "";
}

function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses); // filtered address
  const voice = getVoicePhone(info.contacts.phoneNumbers); // filtered phone

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
  `; // footer HTML
}

function setFooter(data) {
  document.querySelector("#park-footer").innerHTML = footerTemplate(data); // insert footer
}

setHeaderInfo(parkData); // fill header
setParkIntro(parkData); // fill intro
setParkInfoLinks(parkInfoLinks); // fill 3 cards
setFooter(parkData); // fill footer

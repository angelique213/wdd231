import { getParkData } from "./parkService.mjs";

/* -------------------- START APP -------------------- */
async function init() {
  const parkData = await getParkData(); // fetch park data from NPS API

  setHeaderInfo(parkData); // disclaimer link + page title + hero image/title/subtitle
  setParkIntro(parkData); // main h1 + description paragraph

  const parkInfoLinks = getInfoLinks(parkData.images); // build 3 card objects using API images
  setParkInfoLinks(parkInfoLinks); // render the 3 cards into the page

  setFooter(parkData); // render mailing address + phone into footer
}

init();

/* -------------------- HEADER -------------------- */
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
function setParkIntro(data) {
  const introEl = document.querySelector(".intro"); // intro section container
  introEl.innerHTML = `
    <h1>${data.fullName}</h1>
    <p>${data.description}</p>
  `;
}

/* -------------------- INFO CARDS -------------------- */
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
  infoEl.innerHTML = cards.map(mediaCardTemplate).join(""); // render 3 cards
}

/* -------------------- FOOTER -------------------- */
function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing"); // pick mailing address
}

function getVoicePhone(numbers) {
  const voice = numbers.find((number) => number.type === "Voice"); // pick voice phone
  return voice ? voice.phoneNumber : "";
}

function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses); // mailing address object
  const voice = getVoicePhone(info.contacts.phoneNumbers); // phone number string

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

function setFooter(data) {
  const footerEl = document.querySelector("#park-footer"); // footer container
  footerEl.innerHTML = footerTemplate(data); // render footer HTML
}

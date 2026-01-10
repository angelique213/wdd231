import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

/* Update the link in the disclaimer area to read the name of the park and navigate to that park’s official site. */

const disclaimer= document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;

/* Update the title of the page to read the name of the park. */

document.title = parkData.fullName;

/* Use the first image in the list in the data for the hero image. */

const heroImage = document.querySelector(".hero-banner img");
heroImage.src = parkData.images[0].url;
heroImage.alt = parkData.images[0].altText

/* Update the name, designation, and states of the park in the hero.*/

const heroTitle = document.querySelector(".hero-banner__title");
heroTitle.textContent = parkData.name;

const heroSubtitleSpans = document.querySelectorAll(
    ".hero-banner__subtitle span"
);
heroSubtitleSpans[0].textContent = parkData.designation;
heroSubtitleSpans[1].textContent = parkData.states;
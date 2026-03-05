import enableNavigation from "./navigation.mjs"; // imports navigation module to enable menus

/* ============================= */
/* Helper functions */
/* ============================= */

// Finds the mailing address object from the list
function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing");
}

// Finds the voice phone number from the list
function getVoicePhone(numbers) {
  const voice = numbers.find((number) => number.type === "Voice");
  return voice ? voice.phoneNumber : "";
}

/* ============================= */
/* Footer template */
/* ============================= */

// Builds the footer HTML structure
function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses) || {}; // get mailing address object
  const voice = getVoicePhone(info.contacts.phoneNumbers || []); // get voice phone

  return `
    <section class="contact">
      <h3>Contact Info</h3>
      <h4>Mailing Address:</h4>
      <div>
        <p>${mailing.line1 || ""}</p>
        <p>${mailing.city || ""}, ${mailing.stateCode || ""} ${mailing.postalCode || ""}</p>
      </div>
      <h4>Phone:</h4>
      <p>${voice}</p>
    </section>
  `;
}

/* ============================= */
/* Header and Footer updater */
/* ============================= */

// Updates disclaimer, page title, hero banner, footer, and navigation
export default function setHeaderFooter(data) {

  const disclaimerLink = document.querySelector(".disclaimer > a"); // top disclaimer link
  if (disclaimerLink) {
    disclaimerLink.href = data.url; // link to real NPS page
    disclaimerLink.textContent = data.fullName; // show park name
  }

  const titleEl = document.querySelector("head > title"); // browser tab title
  if (titleEl) titleEl.textContent = data.fullName;

  const heroImg = document.querySelector(".hero-banner > img"); // hero banner image
  if (heroImg) {
    heroImg.src = data.images?.[0]?.url || heroImg.src; // hero image URL
    heroImg.alt = data.images?.[0]?.altText || data.fullName; // hero alt text
  }

  const heroTitle = document.querySelector(".hero-banner__title"); // hero banner title
  if (heroTitle) heroTitle.textContent = data.name;

  const heroSubtitleSpans = document.querySelectorAll(".hero-banner__subtitle span"); // subtitle lines
  if (heroSubtitleSpans.length >= 2) {
    heroSubtitleSpans[0].textContent = data.designation; // park designation
    heroSubtitleSpans[1].textContent = data.states; // park states
  }

  const footerEl = document.querySelector("#park-footer"); // footer container
  if (footerEl) footerEl.innerHTML = footerTemplate(data); // insert footer HTML

  enableNavigation(); // activates main menu + submenu buttons on all pages
}
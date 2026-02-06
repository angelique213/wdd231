// Finds the mailing address object
function getMailingAddress(addresses) {
    return addresses.find((address) => address.type === "Mailing");
  }
  
  // Finds the voice phone number
  function getVoicePhone(numbers) {
    const voice = numbers.find((number) => number.type === "Voice");
    return voice ? voice.phoneNumber : "";
  }
  
  // Builds the footer HTML
  function footerTemplate(info) {
    const mailing = getMailingAddress(info.addresses) || {};
    const voice = getVoicePhone(info.contacts.phoneNumbers || []);
  
    return `
      <section class="contact">
        <h3>Contact Info</h3>
        <h4>Mailing Address:</h4>
        <div>
          <p>${mailing.line1 || ""}</p>
          <p>${mailing.city || ""}, ${mailing.stateCode || ""} ${
      mailing.postalCode || ""
    }</p>
        </div>
        <h4>Phone:</h4>
        <p>${voice}</p>
      </section>
    `;
  }
  
  // Updates disclaimer, title, hero banner, and footer
  export default function setHeaderFooter(data) {
    const disclaimerLink = document.querySelector(".disclaimer > a");
    if (disclaimerLink) {
      disclaimerLink.href = data.url;
      disclaimerLink.textContent = data.fullName;
    }
  
    document.querySelector("head > title").textContent = data.fullName;
  
    const heroImg = document.querySelector(".hero-banner > img");
    if (heroImg) {
      heroImg.src = data.images?.[0]?.url || heroImg.src;
      heroImg.alt = data.images?.[0]?.altText || data.fullName;
    }
  
    const heroTitle = document.querySelector(".hero-banner__title");
    if (heroTitle) heroTitle.textContent = data.name;
  
    const heroSubtitleSpans = document.querySelectorAll(".hero-banner__subtitle span");
    if (heroSubtitleSpans.length >= 2) {
      heroSubtitleSpans[0].textContent = data.designation;
      heroSubtitleSpans[1].textContent = data.states;
    }
  
    const footerEl = document.querySelector("#park-footer");
    if (footerEl) footerEl.innerHTML = footerTemplate(data);
  }
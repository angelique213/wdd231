import spritePath from "../images/sprite.symbol.svg";

/* ============================= */
/* Alerts template */
/* ============================= */

export function alertTemplate(alert) {
  let alertType = "information";
  const category = (alert.category || "").trim();

  if (category === "Park Closure") alertType = "closure";
  else if (category) alertType = category.toLowerCase();

  return `<li class="alert">
    <svg class="icon" focusable="false" aria-hidden="true">
      <use xlink:href="${spritePath}#alert-${alertType}"></use>
    </svg>
    <div>
      <h3 class="alert-${alertType}">${alert.title || ""}</h3>
      <p>${alert.description || ""}</p>
    </div>
  </li>`;
}

/* ============================= */
/* Visitor Center list template */
/* ============================= */

export function visitorCenterTemplate(center) {
  return `<article class="visitor-center">
    <h3>
      <a href="visitor-center.html?id=${center.id}">${center.name || ""}</a>
    </h3>
    <p>${center.description || ""}</p>
    ${
      center.directionsInfo
        ? `<p><strong>Directions:</strong> ${center.directionsInfo}</p>`
        : ""
    }
  </article>`;
}

/* ============================= */
/* Activities template */
/* ============================= */

export function activityTemplate(activity) {
  return `<li class="activity">${activity.name || ""}</li>`;
}

/* ============================= */
/* Visitor Center DETAIL templates */
/* ============================= */

export function vcTitleTemplate(text) {
  return `
    <svg class="icon" role="presentation" focusable="false">
      <use xlink:href="${spritePath}#ranger-station"></use>
    </svg>
    ${text}
  `;
}

export function vcInfoTemplate(data) {
  const image = data.images?.[0];

  if (!image) {
    return `<p>${data.description || ""}</p>`;
  }

  return `
    <figure>
      <img src="${image.url}" alt="${image.altText || data.name || ""}" />
      <figcaption>
        ${image.caption || ""}
        <span>${image.credit || ""}</span>
      </figcaption>
    </figure>
    <p>${data.description || ""}</p>
  `;
}

/* reusable list generator */
export function listTemplate(data, contentTemplate) {
  const html = data.map(contentTemplate).join("");
  return `<ul>${html}</ul>`;
}

/* gallery image item */
export function vcImageTemplate(image) {
  return `<li><img src="${image.url}" alt="${image.altText || ""}"></li>`;
}

/* amenities list item */
export function vcAmenityTemplate(item) {
  return `<li>${item}</li>`;
}

/* address templates */
function vcAddressTemplate(address) {
  return `
    <section>
      <h3>${address.type} Address</h3>
      <address>
        ${address.line1 || ""}<br />
        ${address.city || ""}, ${address.stateCode || ""} ${address.postalCode || ""}
      </address>
    </section>
  `;
}

export function vcAddressesListTemplate(addresses) {
  if (!addresses || addresses.length === 0) {
    return `<p>No address information available.</p>`;
  }

  const physical = addresses.find((a) => a.type === "Physical");
  const mailing = addresses.find((a) => a.type === "Mailing");

  let html = "";

  if (physical) html += vcAddressTemplate(physical);
  if (mailing) html += vcAddressTemplate(mailing);

  return html || `<p>No address information available.</p>`;
}

/* directions */
export function vcDirectionsTemplate(text) {
  return `<p>${text || "No directions available."}</p>`;
}

/* contact info */
export function vcContactsTemplate(data) {
  const email = data.emailAddresses?.[0]?.emailAddress;
  const phone = data.phoneNumbers?.[0]?.phoneNumber;

  return `
    <section class="vc-contact__email">
      <h3>Email Address</h3>
      ${
        email
          ? `<a href="mailto:${email}">${email}</a>`
          : `<p>No email available.</p>`
      }
    </section>
    <section class="vc-contact__phone">
      <h3>Phone Number</h3>
      ${
        phone
          ? `<a href="tel:${phone}">${phone}</a>`
          : `<p>No phone number available.</p>`
      }
    </section>
  `;
}

/* reusable accordion/details */
export function detailsTemplate(id, iconId, title, content) {
  return `
    <details name="vc-details" id="${id}">
      <summary>
        <svg class="icon" role="presentation" focusable="false">
          <use xlink:href="${spritePath}#${iconId}"></use>
        </svg>
        ${title}
      </summary>
      ${content}
    </details>
  `;
}
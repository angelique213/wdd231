import spritePath from "../images/sprite.symbol.svg";

// Builds one alert <li> with an icon, title, and description
export function alertTemplate(alert) {
  let alertType = "information";
  const category = (alert.category || "").trim();

  // "Park Closure" must map to "closure" for the sprite icon id
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

// Builds one visitor center block
export function visitorCenterTemplate(center) {
  return `<article class="visitor-center">
    <h3>${center.name || ""}</h3>
    <p>${center.description || ""}</p>
    ${
      center.directionsInfo
        ? `<p><strong>Directions:</strong> ${center.directionsInfo}</p>`
        : ""
    }
  </article>`;
}

// Builds one activity list item
export function activityTemplate(activity) {
  return `<li class="activity">${activity.name || ""}</li>`;
}
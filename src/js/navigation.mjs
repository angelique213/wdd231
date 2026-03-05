function mainMenuHandler(ev) {
    let target = ev.target;
  
    // toggle the show class on the global navigation
    document.querySelector(".global-nav").classList.toggle("show");
  
    // make sure the button itself is selected (not the svg inside)
    if (target.tagName != "BUTTON") {
      target = target.closest("button");
    }
  
    // update aria-expanded attribute for accessibility
    if (document.querySelector(".global-nav").classList.contains("show")) {
      target.setAttribute("aria-expanded", true);
    } else {
      target.setAttribute("aria-expanded", false);
    }
  
    console.log("toggle");
  }
  
  function subMenuHandler(ev) {
    // find the submenu inside the current list item
    const submenu = ev.currentTarget
      .closest("li")
      .querySelector(".global-nav__submenu");
  
    // only toggle if submenu exists (prevents errors)
    if (submenu) {
      submenu.classList.toggle("show");
    }
  
    // rotate the arrow icon
    const icon = ev.currentTarget.querySelector(".icon");
    if (icon) {
      icon.classList.toggle("rotate");
    }
  }
  
  export default function enableNavigation() {
    const menuButton = document.querySelector("#global-nav-toggle");
  
    const subMenuToggles = document.querySelectorAll(
      ".global-nav__split-button__toggle"
    );
  
    if (!menuButton) return;
  
    // main menu open/close
    menuButton.addEventListener("click", mainMenuHandler);
  
    // each submenu toggle
    subMenuToggles.forEach((toggle) => {
      toggle.addEventListener("click", subMenuHandler);
    });
  }
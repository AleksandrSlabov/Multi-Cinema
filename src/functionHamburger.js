import { elementHamburger } from "./selectors";

export function initHamburger() {
  if (
    !elementHamburger.humburgerOpen ||
    !elementHamburger.humburgerClose ||
    !elementHamburger.modalHumburger
  ) {
    return;
  }

  function humburger(par) {
    elementHamburger.modalHumburger.classList[par]("active");
    elementHamburger.humburgerOpen.classList[par]("hidden");
  }

  elementHamburger.humburgerOpen.addEventListener("click", function () {
    humburger("add");
  });
  elementHamburger.humburgerClose.addEventListener("click", function () {
    humburger("remove");
  });
}

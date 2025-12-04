export function initHamburger() {
  const humburgerOpen = document.querySelector(".hamburger");
  const humburgerClose = document.querySelector(".humburger__close");
  const modalHumburger = document.querySelector(".modal__hamburger");

  if (!humburgerOpen || !humburgerClose || !modalHumburger) {
    return;
  }

  function humburger(par) {
    modalHumburger.classList[par]("active");
    humburgerOpen.classList[par]("hidden");
  }

  humburgerOpen.addEventListener("click", function () {
    humburger("add");
  });
  humburgerClose.addEventListener("click", function () {
    humburger("remove");
  });
}

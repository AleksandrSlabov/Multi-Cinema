import "./account.scss";
import { initSlider } from "./functionSlider.js";
import "./showModal.scss";
import { elementSlider } from "./selectors.js";

import { initHamburger } from "./functionHamburger.js";
import { initAuth } from "./functionAuth.js";
console.log("MultiCinema website loaded successfully!");

initSlider(
  elementSlider.sliderImageAll,
  elementSlider.buttonArrowRigth,
  elementSlider.buttonArrowLeft
);

initHamburger();

initAuth();

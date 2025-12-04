console.log("functionSlider");

//slider

export function initSlider() {
  const buttonArrowR = document.querySelector(".arrow__rigth");
  const buttonArrowL = document.querySelector(".arrow__left");
  const slideImg = document.querySelectorAll(".img__slider");

  let currentSlide = 0;

  // Инициализация - показываем первый слайд
  if (slideImg.length > 0) {
    slideImg.forEach((el) => el.classList.add("hidden"));
    slideImg[0].classList.remove("hidden");
  }

  buttonArrowR.addEventListener("click", function () {
    currentSlide = sliderModal(currentSlide + 1, slideImg);
  });

  buttonArrowL.addEventListener("click", function () {
    currentSlide = sliderModal(currentSlide - 1, slideImg);
  });
}

export function sliderModal(n, slide) {
  // Проверяем, что slide существует и это NodeList/массив
  if (!slide || slide.length === 0) {
    console.error("Нет слайдов для отображения");
    return 0;
  }

  // Вычисляем новый индекс слайда
  const newIndex = ((n % slide.length) + slide.length) % slide.length;

  // Скрываем все слайды
  slide.forEach((el) => {
    el.classList.add("hidden");
  });

  // Показываем текущий слайд
  slide[newIndex].classList.remove("hidden");

  console.log(`Показан слайд ${newIndex + 1} из ${slide.length}`);

  // Возвращаем новый индекс для сохранения состояния
  return newIndex;
}

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

export function initSlider(slideElement, buttonR, buttonL) {
  let currentSlide = 0;

  // Инициализация - показываем первый слайд
  if (slideElement.length > 0) {
    slideElement.forEach((el) => el.classList.add("hidden"));
    slideElement[0].classList.remove("hidden");
  }

  buttonR.addEventListener("click", function () {
    currentSlide = sliderModal(currentSlide + 1, slideElement);
  });

  buttonL.addEventListener("click", function () {
    currentSlide = sliderModal(currentSlide - 1, slideElement);
  });
}

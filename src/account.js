import "./account.scss";
import "./style.scss";
import { initHamburger } from "./functionHamburger.js";
import { element } from "./selectors.js";

console.log("Account page loaded");
console.log("localStorage:", localStorage);

initHamburger();

let localStorageCurrentUser = null;

// Загрузка текущего пользователя
if (localStorage.getItem("currentUser")) {
  try {
    localStorageCurrentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (localStorageCurrentUser && localStorageCurrentUser.Name) {
      const surname = localStorageCurrentUser.Surname || "";
      const formattedSurname = surname
        ? surname.charAt(0).toUpperCase() + surname.slice(1)
        : "";

      element.firstNameUser.textContent = `${localStorageCurrentUser.Name} ${formattedSurname}`;
      updateDescriptionDisplay();
    }
  } catch (error) {
    console.error("Ошибка парсинга currentUser:", error);
  }
}

// Функция для обновления отображения описания
function updateDescriptionDisplay() {
  if (!element.descriptionUser) return;

  if (
    localStorageCurrentUser &&
    localStorageCurrentUser.description &&
    localStorageCurrentUser.description.length > 0
  ) {
    element.descriptionUser.textContent = localStorageCurrentUser.description;
  } else {
    element.descriptionUser.textContent = "Расскажите нам о себе!";
  }
}

// Функция для обновления данных пользователя в массиве users
function updateUserInUsersArray(updatedUser) {
  try {
    // Получаем всех пользователей из localStorage
    const usersString = localStorage.getItem("users");
    if (!usersString) {
      console.error("В localStorage нет массива users");
      return false;
    }

    const users = JSON.parse(usersString);

    // Находим индекс пользователя для обновления
    const userIndex = users.findIndex(
      (user) =>
        user.email === updatedUser.email &&
        user.password === updatedUser.password
    );

    if (userIndex !== -1) {
      // Обновляем данные пользователя
      users[userIndex] = { ...users[userIndex], ...updatedUser };

      // Сохраняем обновленный массив обратно в localStorage
      localStorage.setItem("users", JSON.stringify(users));
      console.log("Пользователь обновлен в массиве users:", users[userIndex]);
      return true;
    } else {
      console.error("Пользователь не найден в массиве users");
      return false;
    }
  } catch (error) {
    console.error("Ошибка при обновлении пользователя в массиве:", error);
    return false;
  }
}

// Функция слайдера для аккаунтов
function initAccountSlider() {
  let currentSlide1 = 0;

  if (element.accountSocialLinkAll.length === 0) {
    console.error("Элементы .account не найдены");
    return;
  }

  accountSliderModal(currentSlide1);

  if (element.buttonNextAcc) {
    element.buttonNextAcc.addEventListener("click", function () {
      console.log("Клик по кнопке Далее");
      currentSlide1 = accountSliderModal(currentSlide1 + 1);
    });
  }

  if (element.buttonPrevAcc) {
    element.buttonPrevAcc.addEventListener("click", function () {
      console.log("Клик по кнопке Назад");
      currentSlide1 = accountSliderModal(currentSlide1 - 1);
    });
  }

  function accountSliderModal(n) {
    const slides = document.querySelectorAll(".account");
    if (slides.length === 0) return currentSlide1;

    const newIndex = ((n % slides.length) + slides.length) % slides.length;

    console.log(
      `Переключение слайдов: старый индекс ${currentSlide1}, новый индекс ${newIndex}`
    );

    slides.forEach((slide) => {
      slide.classList.add("hidden");
    });

    slides[newIndex].classList.remove("hidden");

    return newIndex;
  }
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("button__change__descriptionUser")) {
    element.descriptionAndButton.classList.add("hidden");
    console.log("был присвоен класс хидден ");
    element.conteinerModal.classList.remove("hidden");
    element.conteinerModal.classList.add("active");

    console.log(element.textArea.value);

    if (
      element.textArea &&
      localStorageCurrentUser &&
      localStorageCurrentUser.description
    ) {
      element.textArea.value = localStorageCurrentUser.description;
    }
  }

  if (e.target.classList.contains("button_ok_descp")) {
    const textareaValue = element.textArea ? element.textArea.value.trim() : "";
    if (!localStorageCurrentUser) {
      console.log("Нет текущего пользователя ");
      return;
    }

    localStorageCurrentUser.description = textareaValue;
    localStorage.setItem(
      "currentUser",
      JSON.stringify(localStorageCurrentUser)
    );

    updateUserInUsersArray(localStorageCurrentUser);
    element.descriptionAndButton.classList.remove("hidden");
    console.log("был присвоен класс хидден ");
    element.conteinerModal.classList.add("hidden");
    element.conteinerModal.classList.remove("active");
    updateDescriptionDisplay();
  }

  if (e.target.classList.contains("button_close_descp")) {
    updateDescriptionDisplay();

    element.descriptionAndButton.classList.remove("hidden");
    console.log("был присвоен класс хидден ");
    element.conteinerModal.classList.add("hidden");
    element.conteinerModal.classList.remove("active");
  }
});

// Инициализация при загрузке
updateDescriptionDisplay();

// Запускаем слайдер аккаунтов после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  initAccountSlider();
});

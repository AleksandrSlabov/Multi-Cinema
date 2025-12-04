import "./account.scss";
import "./style.scss";
import { initHamburger } from "./functionHamburger.js";

console.log("Account page loaded");
console.log("localStorage:", localStorage);

initHamburger();

const descriptionUser = document.querySelector(".descriptionUser");
const firstNameUser = document.querySelector(".nameUser");
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

      firstNameUser.textContent = `${localStorageCurrentUser.Name} ${formattedSurname}`;
      updateDescriptionDisplay();
    }
  } catch (error) {
    console.error("Ошибка парсинга currentUser:", error);
  }
}

const changeDescription = document.querySelector(
  ".button__change__descriptionUser"
);
const conteinerDescp = document.querySelector(".conteiner__desctiption__user");
const defaultDescp = `
  <button class="button__change__descriptionUser">&#9997;</button>
  <p class="descriptionUser"></p>
`;

// Функция для обновления отображения описания
function updateDescriptionDisplay() {
  const descriptionUser = document.querySelector(".descriptionUser");
  if (!descriptionUser) return;

  if (
    localStorageCurrentUser &&
    localStorageCurrentUser.description &&
    localStorageCurrentUser.description.length > 0
  ) {
    descriptionUser.textContent = localStorageCurrentUser.description;
  } else {
    descriptionUser.textContent = "Расскажите нам о себе!";
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
  const buttonNextAcc = document.querySelector(".buttonNext");
  const buttonPrevAcc = document.querySelector(".buttonPrev");
  const accountSocialLink = document.querySelectorAll(".account");

  let currentSlide1 = 0;

  console.log("Инициализация слайдера аккаунтов:");
  console.log("- Кнопка Далее:", buttonNextAcc);
  console.log("- Кнопка Назад:", buttonPrevAcc);
  console.log("- Элементов account:", accountSocialLink.length);

  // Если нет элементов для слайдера, выходим
  if (accountSocialLink.length === 0) {
    console.error("Элементы .account не найдены");
    return;
  }

  // Показываем первый слайд при загрузке
  accountSliderModal(currentSlide1);

  // Обработчик кнопки "Далее"
  if (buttonNextAcc) {
    buttonNextAcc.addEventListener("click", function () {
      console.log("Клик по кнопке Далее");
      currentSlide1 = accountSliderModal(currentSlide1 + 1);
    });
  }

  // Обработчик кнопки "Назад"
  if (buttonPrevAcc) {
    buttonPrevAcc.addEventListener("click", function () {
      console.log("Клик по кнопке Назад");
      currentSlide1 = accountSliderModal(currentSlide1 - 1);
    });
  }

  // Функция управления слайдером аккаунтов
  function accountSliderModal(n) {
    const slides = document.querySelectorAll(".account");
    if (slides.length === 0) return currentSlide1;

    // Вычисляем новый индекс
    const newIndex = ((n % slides.length) + slides.length) % slides.length;

    console.log(
      `Переключение слайдов: старый индекс ${currentSlide1}, новый индекс ${newIndex}`
    );

    // Скрываем все слайды
    slides.forEach((slide) => {
      slide.classList.add("hidden");
    });

    // Показываем текущий слайд
    slides[newIndex].classList.remove("hidden");

    return newIndex;
  }
}

document.addEventListener("click", function (e) {
  // Создание textarea при нажатии на кнопку редактирования
  if (e.target.classList.contains("button__change__descriptionUser")) {
    console.log("Открытие редактора описания");

    conteinerDescp.classList.add("modaldescp");
    conteinerDescp.innerHTML = `
      <div class="conteiner__buttonModalDescp">
        <button class="button_close_descp">&#10060;</button>
        <button class="button_ok_descp">&#10004;</button>
      </div>
      <textarea class="textAreaDescp"></textarea>
    `;

    const textarea = document.querySelector(".textAreaDescp");
    if (
      textarea &&
      localStorageCurrentUser &&
      localStorageCurrentUser.description
    ) {
      textarea.value = localStorageCurrentUser.description;
    }
  }

  // Сохранение измененного описания
  if (e.target.classList.contains("button_ok_descp")) {
    const textarea = document.querySelector(".textAreaDescp");
    const textareaValue = textarea ? textarea.value.trim() : "";

    // Проверяем, есть ли текущий пользователь
    if (!localStorageCurrentUser) {
      console.error("Нет данных текущего пользователя");
      return;
    }

    // Обновляем описание в currentUser
    localStorageCurrentUser.description = textareaValue;

    // Сохраняем обновленного currentUser
    localStorage.setItem(
      "currentUser",
      JSON.stringify(localStorageCurrentUser)
    );

    // ОБНОВЛЯЕМ ДАННЫЕ В МАССИВЕ USERS
    updateUserInUsersArray(localStorageCurrentUser);

    // Возвращаем исходный вид
    conteinerDescp.innerHTML = defaultDescp;
    conteinerDescp.classList.remove("modaldescp");

    // Обновляем отображение
    updateDescriptionDisplay();

    console.log("Данные сохранены:");
    console.log("- currentUser:", localStorageCurrentUser);
    console.log(
      "- Обновленный массив users:",
      JSON.parse(localStorage.getItem("users") || "[]")
    );
  }

  // Обработка кнопки закрытия без сохранения
  if (e.target.classList.contains("button_close_descp")) {
    conteinerDescp.innerHTML = defaultDescp;
    conteinerDescp.classList.remove("modaldescp");
    updateDescriptionDisplay();
  }
});

// Инициализация при загрузке
updateDescriptionDisplay();

// Запускаем слайдер аккаунтов после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  initAccountSlider();
});

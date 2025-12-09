import { elementAunth } from "./selectors";

let isModalCreated = false;
let currentModal = null;
function crateModaL() {
  if (isModalCreated && currentModal) {
    return;
  }

  const modalClone = elementAunth.templateModal.content.cloneNode(true);
  document.body.appendChild(modalClone);
  console.log("Был создан клон ");

  currentModal = document.querySelector(".modalLoginRegist");
  isModalCreated = true;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

export function initAuth() {
  if (elementAunth.buttonRegistarationUserAll.length === 0) {
    return;
  }

  document.addEventListener("click", function (e) {
    if (e.target.closest(".btn__registr__user")) {
      console.log("была кликнута кнопка вызова модального окна ");
      crateModaL();
      document.querySelector(".loginToProfileOrRegistr").style.display = "flex";
      setTimeout(function () {
        document
          .querySelector(".loginToProfileOrRegistr")
          .classList.add("active");
      }, 10);
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    //очистка импута
    const closeAndOpenShowModal = (selector, method) =>
      selector.classList[method]("active");

    const clearInput = () => document.querySelectorAll(".showModalInput");
    //функция для сбора формы
    function formSubmit(formSelector) {
      const form = document.querySelector(formSelector);
      if (!form) return null;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      return data;
    }
    // if (e.target.closest(".loginToProfileOrRegistr")) {
    if (e.target.closest(".loginToProfile ")) {
      console.log("Local storage", localStorage.getItem("users"));

      closeAndOpenShowModal(
        document.querySelector(".conteiner__button__show__modal"),
        "add"
      );
      closeAndOpenShowModal(
        document.querySelector(".conteinerLoginPtofile"),
        "add"
      );
    }
    //Отправка формы входа на сайт  без валидации пароля
    if (e.target.closest(".buttonLoginToProfile")) {
      e.preventDefault();

      const formData = formSubmit(".conteinerLoginPtofile");
      if (formData) {
        console.log(formData);
        const localData = JSON.parse(localStorage.getItem("users"));
        console.log(localData);

        const user = localData.find(
          (user) =>
            user.email === formData.email && user.password === formData.Password
        );

        console.log("Найденный пользователь:", user);
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          window.location.href = "indexAccount.html";
        }
        console.log("current account goood", localStorage);
      }
    }

    if (e.target.closest(".formRegistr")) {
      closeAndOpenShowModal(
        document.querySelector(".conteinerLoginPtofile"),
        "remove"
      );
      closeAndOpenShowModal(
        document.querySelector(".conteiner__button__show__modal"),

        "add"
      );
      closeAndOpenShowModal(document.querySelector(".modalForm"), "add");
    }
    //отправка формы регестрации
    if (e.target.closest(".button__registration")) {
      e.preventDefault();
      const formData = formSubmit(".showModalForm");

      if (!validateEmail(formData.email)) {
        alert("Введите корректный email");
        return;
      }

      if (!validatePassword(formData.password)) {
        alert("Пароль должен быть не менее 6 символов");
        return;
      }

      if (formData) {
        users.push(formData);
        localStorage.setItem("users", JSON.stringify(users));
        console.log("Local storage", localStorage.getItem("users"));
        clearInput();
        closeAndOpenShowModal(
          document.querySelector(".showModalForm"),
          "remove"
        );
        closeAndOpenShowModal(
          document.querySelector(".conteiner__button__show__modal"),
          "remove"
        );
      }
    }

    if (e.target.closest(".btn__close")) {
      closeAndOpenShowModal(document.querySelector(".showModalForm"), "remove");
      closeAndOpenShowModal(
        document.querySelector(".conteiner__button__show__modal"),
        "remove"
      );
      closeAndOpenShowModal(
        document.querySelector(".loginToProfileOrRegistr"),
        "remove"
      );
      closeAndOpenShowModal(
        document.querySelector(".conteinerLoginPtofile"),
        "remove"
      );

      clearInput();
    }
  });
}

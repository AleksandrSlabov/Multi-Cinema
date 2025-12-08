import { elementAunth } from "./selectors";
export function initAuth() {
  if (elementAunth.buttonRegistarationUserAll.length === 0) {
    return;
  }

  elementAunth.buttonRegistarationUserAll.forEach((el) =>
    el.addEventListener("click", function () {
      elementAunth.loginToProfile.classList.add("active");
    })
  );
  const users = JSON.parse(localStorage.getItem("users")) || [];
  //управелние модальным окном регестрации пользователя
  document.addEventListener("click", function (e) {
    //функция открытия и закрытия модального окна

    //очистка импута
    const closeAndOpenShowModal = (selector, method) =>
      selector.classList[method]("active");

    const clearInput = () =>
      elementAunth.showModalInputAll.forEach((el) => (el.value = ""));
    //функция для сбора формы
    function formSubmit(formSelector) {
      const form = document.querySelector(formSelector);
      if (!form) return null;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      return data;
    }
    // }

    if (e.target.closest(".loginToProfileOrRegistr")) {
      console.log("Local storage", localStorage.getItem("users"));

      closeAndOpenShowModal(elementAunth.conteinerButtonShowModal, "add");
      closeAndOpenShowModal(elementAunth.conteinerLoginPtofile, "add");
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
      closeAndOpenShowModal(elementAunth.conteinerButtonShowModal, "add");
      closeAndOpenShowModal(elementAunth.showModalForm, "add");
    }
    //отправка формы регестрации
    if (e.target.closest(".button__registration")) {
      e.preventDefault();
      const formData = formSubmit(".showModalForm");

      if (formData) {
        users.push(formData);
        localStorage.setItem("users", JSON.stringify(users));
        console.log("Local storage", localStorage.getItem("users"));
        clearInput();
        closeAndOpenShowModal(elementAunth.showModalForm, "remove");
        closeAndOpenShowModal(elementAunth.conteinerButtonShowModal, "remove");
      }
    }

    if (e.target.closest(".btn__close")) {
      closeAndOpenShowModal(elementAunth.showModalForm, "remove");
      closeAndOpenShowModal(elementAunth.conteinerButtonShowModal, "remove");
      closeAndOpenShowModal(elementAunth.loginToProfileOrRegistr, "remove");
      closeAndOpenShowModal(elementAunth.conteinerLoginPtofile, "remove");

      clearInput();
    }
  });
}
